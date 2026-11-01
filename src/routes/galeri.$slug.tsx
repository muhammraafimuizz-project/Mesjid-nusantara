import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { galeriArtikelTerkait, galeriArticles } from "@/lib/galeri-data";

export const Route = createFileRoute("/galeri/$slug")({
  loader: ({ params }) => {
    const article = galeriArticles.find((item) => item.slug === params.slug);
    if (!article) {
      throw notFound();
    }
    return article;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.judul} — Galeri Masjid Nusantara` },
      { name: "description", content: loaderData.ringkasan },
      { property: "og:title", content: loaderData.judul },
      { property: "og:description", content: loaderData.ringkasan },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Galeri</p>
      <h1 className="mt-4 text-3xl font-bold text-foreground">Artikel tidak ditemukan</h1>
      <Link to="/galeri" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
        <ArrowLeft className="h-4 w-4" /> Kembali ke Galeri
      </Link>
    </div>
  ),
  component: GaleriDetailPage,
});

function GaleriDetailPage() {
  const article = Route.useLoaderData();
  const related = galeriArtikelTerkait(article.slug).filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
        <img src={article.gambar} alt={article.judul} className="h-[260px] w-full object-cover md:h-[420px]" />
      </div>

      <div className="mt-8 md:mt-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold">{article.kategori}</span>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {article.tanggal}
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl">{article.judul}</h1>

        <div className="mt-6 rounded-2xl border bg-card p-5 text-sm leading-relaxed text-muted-foreground md:p-6">
          <p className="flex items-center gap-2 font-medium text-foreground">
            <Clock3 className="h-4 w-4 text-gold" />
            Ringkasan
          </p>
          <p className="mt-3">{article.ringkasan}</p>
        </div>

        <article className="mt-8 space-y-5 text-base leading-8 text-foreground/80 md:text-lg">
          {article.isi.map((paragraph, index) => (
            <p key={`${article.slug}-${index}`}>{paragraph}</p>
          ))}
        </article>

        <div className="mt-10 flex items-center justify-start">
          <Link to="/galeri" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Galeri
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t pt-10">
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Artikel Terkait</p>
              <h2 className="mt-2 text-2xl font-bold text-foreground">Lanjutkan membaca</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to="/galeri/$slug"
                params={{ slug: item.slug }}
                className="group overflow-hidden rounded-2xl border bg-card text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="overflow-hidden">
                  <img src={item.gambar} alt={item.judul} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{item.kategori}</p>
                  <h3 className="mt-2 text-lg font-bold text-foreground">{item.judul}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.ringkasan}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
