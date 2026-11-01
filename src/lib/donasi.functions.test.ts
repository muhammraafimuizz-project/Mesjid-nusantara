import { describe, expect, it } from "vitest";

import { kirimKeN8n, kirimDonasi } from "./donasi.functions";
import { toPayload } from "./donasi";

describe("kirimKeN8n", () => {
  it("mengirim payload ke webhook dengan header secret", async () => {
    const payload = toPayload("DON-261102-0000", new Date("2026-11-01T17:30:00Z"), {
      nama: "Budi",
      anonim: false,
      noWa: "081234567890",
      program: "Pembangunan Masjid",
      nominal: 100000,
      metode: "Transfer",
      pesan: "Selamat",
    });

    let lastBody: unknown;
    const fetchMock = async (_input: RequestInfo | URL, init?: RequestInit) => {
      lastBody = init?.body ? JSON.parse(String(init.body)) : null;
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
    };

    await expect(kirimKeN8n(payload, { fetch: fetchMock as typeof fetch, url: "https://example.com/webhook", secret: "secret" })).resolves.toBeUndefined();
    expect(lastBody).toEqual(payload);
  });

  it("melempar error saat webhook menolak atau gagal", async () => {
    const payload = toPayload("DON-261102-0001", new Date("2026-11-01T17:30:00Z"), {
      nama: "Budi",
      anonim: false,
      program: "Pembangunan Masjid",
      nominal: 100000,
      metode: "Transfer",
      pesan: "Selamat",
    });

    const fetchMock = async () => new Response("bad", { status: 403 });

    await expect(kirimKeN8n(payload, { fetch: fetchMock as typeof fetch, url: "https://example.com/webhook", secret: "secret" })).rejects.toThrow("Gagal menyimpan donasi");
  });

  it("menolak konfigurasi kosong", async () => {
    const payload = toPayload("DON-261102-0002", new Date("2026-11-01T17:30:00Z"), {
      nama: "Budi",
      anonim: false,
      program: "Pembangunan Masjid",
      nominal: 100000,
      metode: "Transfer",
      pesan: "Selamat",
    });

    await expect(kirimKeN8n(payload, { fetch: fetch as typeof fetch, url: "", secret: "" })).rejects.toThrow("Konfigurasi webhook tidak valid");
  });
});

describe("kirimDonasi", () => {
  it("mengembalikan kode saat input valid", async () => {
    globalThis.fetch = async () => new Response(JSON.stringify({ ok: true }), { status: 200 });
    process.env.N8N_WEBHOOK_URL = "https://example.com/webhook";
    process.env.N8N_WEBHOOK_SECRET = "secret";

    const result = await kirimDonasi({
      nama: "Budi",
      anonim: false,
      noWa: "081234567890",
      program: "Pembangunan Masjid",
      nominal: 100000,
      metode: "Transfer",
      pesan: "Semoga bermanfaat",
    });

    expect(result.kode).toMatch(/^DON-/);
  });

});
