import { describe, expect, it } from "vitest";

import { amanUntukSheet, buatKodeDonasi, parseDonasi, toPayload } from "./donasi";

const validInput = {
  nama: "Budi",
  anonim: false,
  noWa: "081234567890",
  program: "Pembangunan Masjid",
  nominal: 100000,
  metode: "Transfer" as const,
  pesan: "Semoga bermanfaat",
};

describe("parseDonasi", () => {
  it("menolak nominal yang tidak valid", () => {
    for (const nominal of [0, -5000, 1500.5, "abc", 5000, 2000000000]) {
      expect(() => parseDonasi({ ...validInput, nominal })).toThrow();
    }
  });

  it("menolak nama dan pesan yang tidak valid", () => {
    expect(() => parseDonasi({ ...validInput, nama: "" })).toThrow();
    expect(() => parseDonasi({ ...validInput, nama: "x".repeat(101) })).toThrow();
    expect(() => parseDonasi({ ...validInput, pesan: "x".repeat(501) })).toThrow();
  });
});

describe("amanUntukSheet", () => {
  it("mengamankan karakter formula injection", () => {
    expect(amanUntukSheet("=HYPERLINK(\"https://example.com\")")).toBe("'=HYPERLINK(\"https://example.com\")");
    expect(amanUntukSheet("Budi")).toBe("Budi");
  });
});

describe("buatKodeDonasi", () => {
  it("membuat format kode sesuai timestamp dan random", () => {
    expect(buatKodeDonasi(new Date("2026-11-01T17:30:00Z"), () => 0)).toBe("DON-261102-0000");
  });
});

describe("toPayload", () => {
  it("menghasilkan payload sheet yang benar", () => {
    const payload = toPayload("DON-261102-0000", new Date("2026-11-01T17:30:00Z"), {
      ...validInput,
      anonim: true,
      pesan: "=HYPERLINK(\"https://example.com\")",
    });

    expect(payload.status).toBe("Menunggu");
    expect(payload.anonim).toBe("YA");
    expect(payload.nama).toBe("'Budi");
    expect(payload.pesan).toBe("'=HYPERLINK(\"https://example.com\")");
  });
});
