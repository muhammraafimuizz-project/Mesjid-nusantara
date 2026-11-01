import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/lib/data";
import { galeriArticles } from "@/lib/galeri-data";
import { PageBanner } from "@/components/site";

export const Route = createFileRoute("/galeri/")({
  head: () => ({
    meta: [
      { title: "Galeri — Masjid Nusantara" },
      { name: "description", content: "Dokumentasi pembangunan, renovasi, pendidikan Islam, dan kegiatan sosial." },
      { property: "og:title", content: "Galeri — Masjid Nusantara" },
      { property: "og:description", content: "Dokumentasi kegiatan Yayasan Masjid Nusantara." },
    ],
  }),
  component: () => (
    <>
      <PageBanner title="Galeri" subtitle="Dokumentasi perjalanan kami di pelosok nusantara." image={images.pendidikan} />
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-12 sm:grid-cols-2 md:grid-cols-3">
        {galeriArticles.map((article) => (
          <Link
            key={article.id}
            to="/galeri/$slug"
            params={{ slug: article.slug }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="relative overflow-hidden">
              <img
                src={article.gambar}
                alt={article.judul}
                loading="lazy"
                className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
              <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground">{article.kategori}</span>
            </div>
            <div className="space-y-2 p-4">
              <h2 className="text-lg font-bold text-foreground">{article.judul}</h2>
              <p className="text-sm text-muted-foreground">{article.ringkasan}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  ),
});
