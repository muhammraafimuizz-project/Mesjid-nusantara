import { images } from "@/lib/data";

export interface GaleriArtikel {
  id: number;
  slug: string;
  judul: string;
  kategori: string;
  gambar: string;
  tanggal: string;
  ringkasan: string;
  isi: string[];
}

export const galeriArticles: GaleriArtikel[] = [
  {
    id: 1,
    slug: "pembangunan",
    judul: "Pembangunan Masjid Baru di Desa Tertinggal",
    kategori: "Pembangunan",
    gambar: images.hero,
    tanggal: "12 Oktober 2026",
    ringkasan: "Proses pembangunan masjid baru di wilayah terpencil untuk mempermudah akses ibadah warga.",
    isi: [
      "Yayasan Masjid Nusantara kembali menggelar program pembangunan masjid di daerah yang masih minim fasilitas ibadah. Proyek ini menjadi wujud kepedulian terhadap kebutuhan umat yang tinggal di pelosok, terutama dalam akses ibadah yang lebih layak dan nyaman.",
      "Pada tahap awal, tim pendamping memetakan lokasi, kebutuhan dasar, dan kesiapan warga sekitar. Hasilnya, pembangunan dilakukan secara bertahap agar tetap sesuai dengan kebutuhan jangka panjang komunitas setempat.",
      "Kini, masjid yang dibangun sudah mulai terlihat bentuk struktur utamanya. Ke depan, area masjid juga direncanakan menjadi pusat aktivitas keagamaan seperti kajian, pembelajaran Al-Qur'an, dan kegiatan sosial rutin.",
    ],
  },
  {
    id: 2,
    slug: "renovasi",
    judul: "Renovasi Masjid agar Lebih Nyaman dan Aman",
    kategori: "Renovasi",
    gambar: images.renovasi,
    tanggal: "22 September 2026",
    ringkasan: "Renovasi bangunan masjid lama agar lebih aman, bersih, dan nyaman untuk jamaah.",
    isi: [
      "Masjid-masjid tua yang sudah mengalami kerusakan ringan maupun berat menjadi fokus utama program renovasi. Banyak bangunan ibadah yang mulai rapuh akibat cuaca, usia, dan minimnya pemeliharaan berkala.",
      "Dalam kegiatan ini, tim bekerja sama dengan relawan lokal untuk mengganti atap yang rusak, memperbaiki lantai, serta mempercantik ruang wudhu dan area ibadah. Semua proses dilakukan dengan tetap menjaga karakter bangunan lama yang memiliki nilai historis bagi masyarakat.",
      "Hasilnya, masjid dapat kembali digunakan secara optimal untuk ibadah, kajian, dan kegiatan keluarga. Tak hanya fungsi religius, renovasi ini juga menumbuhkan rasa kebersamaan warga dalam menjaga warisan umat.",
    ],
  },
  {
    id: 3,
    slug: "pendidikan-islam",
    judul: "Pendidikan Islam untuk Generasi Muda",
    kategori: "Pendidikan Islam",
    gambar: images.pendidikan,
    tanggal: "15 Agustus 2026",
    ringkasan: "Program pembelajaran Al-Qur'an dan pendidikan agama ditingkatkan di masjid-masjid binaan.",
    isi: [
      "Program pendidikan Islam hadir untuk memastikan anak-anak dan remaja memiliki akses terhadap pembelajaran agama yang terstruktur dan menyenangkan. Para pengajar dibimbing agar metode yang digunakan sesuai dengan kebutuhan usia dan tingkat pemahaman santri.",
      "Kegiatan ini tidak hanya fokus pada hafalan dan baca tulis Al-Qur'an, tetapi juga pembinaan akhlak, adab dalam beribadah, dan pemahaman dasar syariat. Dengan pendekatan yang ramah, para peserta mampu belajar dengan lebih nyaman dan semangat.",
      "Sejak program berjalan, jumlah peserta belajar terus meningkat di berbagai wilayah binaan. Ini menjadi bukti bahwa kebutuhan pendidikan keagamaan masih sangat besar dan harus terus didukung secara berkelanjutan.",
    ],
  },
  {
    id: 4,
    slug: "kegiatan-sosial",
    judul: "Kegiatan Sosial untuk Keluarga yang Membutuhkan",
    kategori: "Kegiatan Sosial",
    gambar: images.kemanusiaan,
    tanggal: "05 Juli 2026",
    ringkasan: "Pelaksanaan bantuan dan kegiatan sosial rutin untuk masyarakat sekitar masjid binaan.",
    isi: [
      "Kegiatan sosial menjadi salah satu pilar utama dalam layanan Yayasan Masjid Nusantara. Tidak hanya fokus pada pembangunan fisik masjid, tetapi juga hadir dalam membantu keluarga yang membutuhkan dukungan di masa sulit.",
      "Pada momen tertentu, bantuan berupa sembako, perlengkapan sekolah, hingga dukungan kesehatan disalurkan secara langsung kepada warga. Distribusi dilakukan dengan pendekatan yang humanis dan memperhatikan kebutuhan mendasar mereka.",
      "Kegiatan ini juga mendorong semangat gotong royong antarwarga, sehingga masyarakat tidak hanya menerima bantuan, tetapi ikut terlibat dalam proses kepedulian sosial yang lebih luas.",
    ],
  },
  {
    id: 5,
    slug: "gotong-royong",
    judul: "Gotong Royong Warga Membangun Lingkungan Masjid",
    kategori: "Gotong Royong",
    gambar: images.hero,
    tanggal: "30 Juni 2026",
    ringkasan: "Semangat kebersamaan warga terlihat saat proses pembangunan dan pemeliharaan lingkungan masjid.",
    isi: [
      "Semangat gotong royong menjadi kekuatan utama dalam pembangunan dan pemeliharaan fasilitas masjid. Warga bukan hanya hadir sebagai penonton, tetapi ikut turun tangan dalam proses pembuatan, pengecatan, penataan taman, hingga sirkulasi air bersih.",
      "Kegiatan ini memperkuat rasa ikatan sosial di lingkungan sekitar masjid dan menumbuhkan rasa memiliki terhadap fasilitas umum yang mereka manfaatkan bersama setiap hari.",
      "Dengan pola kerja sama yang terstruktur, banyak pekerjaan yang sebelumnya terasa berat menjadi lebih ringan, cepat, dan lebih efisien. Ini juga mencerminkan nilai ukhuwah yang terus dijaga di tengah masyarakat.",
    ],
  },
  {
    id: 6,
    slug: "masjid-binaan",
    judul: "Masjid Binaan Menjadi Pusat Kegiatan Umat",
    kategori: "Masjid Binaan",
    gambar: images.renovasi,
    tanggal: "18 Mei 2026",
    ringkasan: "Masjid binaan semakin aktif dijadikan pusat ibadah, pendidikan, dan aktivitas sosial.",
    isi: [
      "Masjid yang telah dibina oleh Yayasan Masjid Nusantara tidak hanya berfungsi sebagai tempat ibadah, tetapi juga sebagai pusat aktivitas umat. Berbagai kegiatan dilaksanakan di dalam maupun di sekitar gedung masjid sesuai kebutuhan komunitas.",
      "Dari kajian mingguan, belajar Al-Qur'an, hingga program sosial bersama, masjid binaan menjadi ruang yang mendorong tumbuhnya semangat kebersamaan. Ibadah dan interaksi sosial berjalan beriringan dalam satu ekosistem yang sehat.",
      "Ke depan, pengelolaan masjid binaan akan terus ditingkatkan agar manfaatnya lebih luas dan berkelanjutan, terutama dalam memperkuat peran masjid sebagai lembaga sosial dan religius bagi masyarakat.",
    ],
  },
];

export const galeriArtikelTerkait = (slug: string) => {
  const currentIndex = galeriArticles.findIndex((article) => article.slug === slug);
  const current = galeriArticles[currentIndex];
  const others = galeriArticles.filter((article) => article.slug !== slug);

  if (!current) return galeriArticles.slice(0, 3);

  if (current.kategori === "Masjid Binaan") {
    return others.slice(0, 3);
  }

  const sameCategory = others.filter((article) => article.kategori === current.kategori);
  return (sameCategory.length ? sameCategory : others).slice(0, 3);
};
