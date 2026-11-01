import { createServerFn } from "@tanstack/react-start";
import fs from "node:fs";
import path from "node:path";

import { buatKodeDonasi, parseDonasi, toPayload, type DonasiInput, type DonasiPayload } from "./donasi";

const serverEnvLoaded = new Set<string>();

function loadFallbackEnvFile(): void {
  if (typeof process === "undefined") return;

  const candidates = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "..", ".env"),
    path.resolve(process.cwd(), "..", ".env.local"),
  ];

  for (const filePath of candidates) {
    if (serverEnvLoaded.has(filePath) || !fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;

      const separator = trimmed.indexOf("=");
      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim();

      if (key && !Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = value.replace(/^['"]|['"]$/g, "");
      }
    }

    serverEnvLoaded.add(filePath);
  }
}

function getServerEnv(name: string): string | undefined {
  loadFallbackEnvFile();

  const value = process.env[name] ?? (typeof import.meta !== "undefined" ? (import.meta.env as Record<string, string | undefined>)?.[name] : undefined);

  return typeof value === "string" ? value.trim() : undefined;
}

function validateN8nConfig(url: string | undefined, secret: string | undefined): { url: string; secret: string } {
  const invalidNames: string[] = [];

  if (!url) invalidNames.push("N8N_WEBHOOK_URL");
  if (!secret) invalidNames.push("N8N_WEBHOOK_SECRET");

  if (invalidNames.length > 0) {
    console.warn("[n8n] Konfigurasi webhook tidak valid. Variabel tidak tersedia:", invalidNames);
    throw new Error("Konfigurasi webhook tidak valid");
  }

  try {
    new URL(url!);
  } catch {
    console.warn("[n8n] Konfigurasi webhook tidak valid. Variabel tidak valid:", ["N8N_WEBHOOK_URL"]);
    throw new Error("Konfigurasi webhook tidak valid");
  }

  return { url: url!, secret: secret! };
}

export async function kirimKeN8n(
  payload: DonasiPayload,
  deps?: { fetch: typeof fetch; url: string; secret: string },
): Promise<void> {
  const url = deps?.url?.trim() ?? getServerEnv("N8N_WEBHOOK_URL");
  const secret = deps?.secret?.trim() ?? getServerEnv("N8N_WEBHOOK_SECRET");
  const config = validateN8nConfig(url, secret);

  const response = await (deps?.fetch ?? fetch)(config.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-webhook-secret": config.secret,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error("Gagal menyimpan donasi");
  }
}

export async function kirimDonasi(input: unknown): Promise<{ kode: string }> {
  const parsed = parseDonasi(input);
  const kode = buatKodeDonasi(new Date());
  const payload = toPayload(kode, new Date(), parsed);

  const honeypot = (input as { website?: string } | null)?.website;
  if (honeypot && String(honeypot).trim() !== "") {
    return { kode };
  }

  await kirimKeN8n(payload);
  return { kode };
}

export const serverKirimDonasi = createServerFn({
  method: "POST",
}).handler(async ({ data }) => {
  const payload = await kirimDonasi(data ?? {});
  return payload;
});
