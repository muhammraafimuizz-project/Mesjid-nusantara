export type DonasiMetode = "Transfer" | "QRIS";

export type DonasiInput = {
  nama: string;
  anonim: boolean;
  noWa?: string;
  program: string;
  nominal: number;
  metode: DonasiMetode;
  pesan?: string;
};

export type DonasiPayload = {
  kode_donasi: string;
  waktu: string;
  nama: string;
  anonim: "YA" | "TIDAK";
  no_wa: string;
  program: string;
  nominal: number;
  metode: string;
  pesan: string;
  status: "Menunggu";
};

const FORMULA_PREFIXES = ["=", "+", "-", "@"] as const;
const RANDOM_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function amanUntukSheet(teks: string): string {
  const normalized = teks ?? "";
  if (FORMULA_PREFIXES.some((prefix) => normalized.startsWith(prefix))) {
    return `'${normalized}`;
  }
  return normalized;
}

export function buatKodeDonasi(now: Date, rand: () => number = Math.random): string {
  const date = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  const yy = String(date.getUTCFullYear()).slice(-2);
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const prefix = `${yy}${mm}${dd}`;
  const randomPart = Array.from({ length: 4 }, () => RANDOM_ALPHABET[Math.floor(rand() * RANDOM_ALPHABET.length)]).join("");
  return `DON-${prefix}-${randomPart}`;
}

function validateText(value: unknown, label: string, max: number): string {
  if (typeof value !== "string") {
    throw new Error(`${label} harus berupa teks.`);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`${label} tidak boleh kosong.`);
  }
  if (trimmed.length > max) {
    throw new Error(`${label} maksimal ${max} karakter.`);
  }

  return trimmed;
}

export function parseDonasi(raw: unknown): DonasiInput {
  if (!raw || typeof raw !== "object") {
    throw new Error("Data donasi tidak valid.");
  }

  const value = raw as Record<string, unknown>;
  const nama = validateText(value.nama, "Nama", 100);
  const program = validateText(value.program, "Program", 120);

  const anonim = value.anonim === true;

  if (value.noWa !== undefined && value.noWa !== null && typeof value.noWa !== "string") {
    throw new Error("Nomor WhatsApp harus berupa teks.");
  }
  const noWa = value.noWa ? String(value.noWa).trim() : undefined;

  const nominal = value.nominal;
  if (typeof nominal !== "number" || !Number.isFinite(nominal) || !Number.isInteger(nominal)) {
    throw new Error("Nominal harus bilangan bulat dalam Rupiah.");
  }
  if (nominal < 10000 || nominal > 1_000_000_000) {
    throw new Error("Nominal harus antara Rp 10.000 dan Rp 1.000.000.000.");
  }

  if (value.metode !== "Transfer" && value.metode !== "QRIS") {
    throw new Error("Metode pembayaran harus Transfer atau QRIS.");
  }

  const pesan = value.pesan === undefined || value.pesan === null ? "" : String(value.pesan);
  if (pesan.length > 500) {
    throw new Error("Pesan maksimal 500 karakter.");
  }

  return {
    nama,
    anonim,
    noWa: noWa || undefined,
    program,
    nominal,
    metode: value.metode as DonasiMetode,
    pesan,
  };
}

export function toPayload(kode: string, now: Date, d: DonasiInput): DonasiPayload {
  const nama = `'${amanUntukSheet(d.nama).replace(/^'/, "")}`;
  const pesan = `'${amanUntukSheet(d.pesan ?? "").replace(/^'/, "")}`;
  const waktu = now.toISOString();

  return {
    kode_donasi: kode,
    waktu,
    nama,
    anonim: d.anonim ? "YA" : "TIDAK",
    no_wa: d.noWa ? amanUntukSheet(d.noWa) : "",
    program: amanUntukSheet(d.program),
    nominal: d.nominal,
    metode: d.metode,
    pesan,
    status: "Menunggu",
  };
}
