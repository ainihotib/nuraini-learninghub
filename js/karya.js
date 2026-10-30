/* =====================================================================
   DATA SITUS, KARYA, PROGRAM, DAN PROFIL
   Hanya berkas ini yang perlu Anda ubah untuk memperbarui isi web.
   ===================================================================== */

const SITE = {
  nama: "Galeri Karya Nuraini",            // nama di header dan judul tab
  pembuat: "Nuraini, M.Pd.",
  tagline: "Game edukasi, lab maya, dan pengalaman AR untuk kelas.",
  whatsapp: "6281285959665",               // format internasional tanpa tanda + atau 0
  email: "nurainihotib05@gmail.com",       // kosongkan ("") untuk menyembunyikan
  situsLain: "https://sites.google.com/view/nuraini-learninghub/home",
  // Alat yang dipakai untuk membuat karya (strip "Dibuat dengan")
  dibuatDengan: ["Canva", "NotebookLM", "ChatGPT", "Claude", "Lovable", "Heyzine"],
  // Tautan sosial. Isi url untuk tautan aktif; kalau url kosong, yang tampil hanya nama akunnya.
  sosial: [
    { label: "Instagram", akun: "@nuraini_hotib",          url: "https://www.instagram.com/nuraini_hotib" },
    { label: "TikTok",    akun: "@nurainihotib80",          url: "https://www.tiktok.com/@nurainihotib80" },
    { label: "X",         akun: "@KafaAini",                url: "https://x.com/KafaAini" },
    { label: "Facebook",  akun: "Aini Kafa Akyas",          url: "" },
    { label: "LinkedIn",  akun: "Nuraini Hotib",            url: "" },
    { label: "YouTube",   akun: "Aini Kafa Channel",        url: "" },
    { label: "GitHub",    akun: "ainihotib",                url: "https://github.com/ainihotib" },
    { label: "ResearchGate", akun: "Nuraini-Nuraini-16",    url: "https://www.researchgate.net/profile/Nuraini-Nuraini-16" }
  ]
};

/* Kategori. Kunci (id) dipakai di data karya di bawah. */
const KATEGORI = [
  { id: "game", nama: "Game edukasi" },
  { id: "lab",  nama: "Lab maya" },
  { id: "ar",   nama: "Game & lab AR" },
  { id: "lain", nama: "Media lain" }
];

/* ---------------------------------------------------------------------
   Karya Nuraini. Karya terbaru taruh paling atas.
   Isian:
     judul      wajib
     deskripsi  satu sampai dua kalimat
     kategori   game | lab | ar | lain
     mapel      misalnya "Fisika" (dipakai juga untuk strip "bidang")
     jenjang    misalnya "SMA", "SMP–SMA", "SD" (boleh dikosongkan)
     link       tautan karya; kosong = tombol menjadi "Segera hadir"
     gambar     (opsional) alamat gambar sampul, misalnya "img/parabola.jpg"
     unggulan   true = kartu tampil lebih lebar
     demo       true = muncul label "Data contoh". HAPUS baris ini saat
                mengganti dengan karya asli.
   --------------------------------------------------------------------- */
const KARYA = [
  {
    judul: "Sains Tis Cilik: Petualangan",
    deskripsi: "Media interaktif bertema petualangan sains, dibuat dengan Lovable.",
    kategori: "lain", mapel: "Sains", jenjang: "",
    link: "https://sainstis-cilik-petualangan.lovable.app/", unggulan: true
  },
  {
    judul: "Petualangan Matematika",
    deskripsi: "Media interaktif petualangan matematika yang dibuat dengan Canva Site.",
    kategori: "lain", mapel: "Matematika", jenjang: "",
    link: "https://sosiologixi5.my.canva.site/petualangan-matematika"
  },
  {
    judul: "Kumpulan Video Pembelajaran & Komik Digital",
    deskripsi: "Video pembelajaran dan buku komik digital hasil pelatihan pembuatan video pembelajaran.",
    kategori: "lain", mapel: "Lintas mapel", jenjang: "",
    link: "https://drive.google.com/drive/folders/1edek-RQfnsT9QXboxJn6L6rrGKBtcI7R?usp=drive_link"
  },
  {
    judul: "Video Pembelajaran di TikTok",
    deskripsi: "Video pembelajaran dan buku komik digital Nuraini Learning Hub yang bisa langsung ditonton.",
    kategori: "lain", mapel: "Lintas mapel", jenjang: "",
    link: "https://www.tiktok.com/@nurainihotib80"
  },
  {
    judul: "Bahan Ajar Komik Digital",
    deskripsi: "Bahan ajar berbentuk komik dalam format flipbook yang dibuka halaman demi halaman.",
    kategori: "lain", mapel: "Lintas mapel", jenjang: "",
    link: "https://heyzine.com/flip-book/2edf749a25.html"
  },
  {
    judul: "Flipbook Digital",
    deskripsi: "Bahan belajar digital dalam format flipbook, nyaman dibaca di HP maupun laptop.",
    kategori: "lain", mapel: "Lintas mapel", jenjang: "",
    link: "https://heyzine.com/flip-book/779fad3590.html"
  },

  /* ---- Contoh di bawah ini hanya pengisi tampilan. Ganti atau hapus. ---- */
  {
    judul: "Simulasi Gerak Parabola",
    deskripsi: "Atur sudut dan kecepatan, lalu amati lintasan peluru terbentuk dan hitung jangkauannya.",
    kategori: "lab", mapel: "Fisika", jenjang: "SMA",
    link: "", demo: true
  },
  {
    judul: "Titrasi Asam-Basa Virtual",
    deskripsi: "Teteskan larutan, amati perubahan warna indikator, dan baca kurva pH secara langsung.",
    kategori: "lab", mapel: "Kimia", jenjang: "SMA",
    link: "", demo: true
  },
  {
    judul: "Bedah Sel dengan AR",
    deskripsi: "Arahkan kamera ke penanda dan jelajahi organel sel dalam bentuk tiga dimensi.",
    kategori: "ar", mapel: "Biologi", jenjang: "SMP–SMA",
    link: "", demo: true
  },
  {
    judul: "Petualangan Tata Surya",
    deskripsi: "Misi menjelajah planet sambil mengumpulkan fakta dan menjawab tantangan singkat.",
    kategori: "game", mapel: "IPAS", jenjang: "SD",
    link: "", demo: true
  },
  {
    judul: "Escape Room Hukum Newton",
    deskripsi: "Pecahkan teka-teki gaya dan gerak untuk membuka pintu ruangan berikutnya.",
    kategori: "game", mapel: "Fisika", jenjang: "SMP",
    link: "", demo: true
  }
];

/* ---------------------------------------------------------------------
   Karya peserta pelatihan (tab kedua). Kosong dulu; isi setelah ada kelas.
   Isian sama seperti KARYA, ditambah:
     pembuat    nama peserta
   --------------------------------------------------------------------- */
const KARYA_PESERTA = [];

/* ---------------------------------------------------------------------
   Program pelatihan (dari Proposal Penawaran Pelatihan)
   --------------------------------------------------------------------- */
const PROGRAM = [
  { nama: "AI untuk Perencanaan & Asesmen Pembelajaran",
    sasaran: "Guru, kepala sekolah/madrasah",
    fokus: "Pemanfaatan AI (ChatGPT, NotebookLM, dsb.) untuk menyusun modul ajar, soal, dan umpan balik belajar." },
  { nama: "Canva Hack: Media Pembelajaran Interaktif",
    sasaran: "Guru semua jenjang",
    fokus: "Desain media ajar, LKPD, dan konten visual pembelajaran menggunakan Canva for Education." },
  { nama: "NotebookLM untuk Pembelajaran",
    sasaran: "Guru, pengawas",
    fokus: "Mengolah sumber belajar menjadi rangkuman, kuis, dan panduan belajar berbasis AI." },
  { nama: "Pembelajaran Berdiferensiasi & Deep Learning",
    sasaran: "Guru kelas/mata pelajaran",
    fokus: "Merancang pembelajaran yang menyesuaikan kesiapan, minat, dan gaya belajar siswa." },
  { nama: "Design Thinking dalam Pengembangan Pembelajaran",
    sasaran: "Guru, tim kurikulum",
    fokus: "Merancang solusi pembelajaran berbasis empati dan kebutuhan nyata peserta didik." },
  { nama: "Pengembangan Kurikulum & Kurikulum Berbasis Cinta (KBC)",
    sasaran: "Kepala sekolah/madrasah, tim kurikulum",
    fokus: "Penyusunan dan penyelarasan kurikulum operasional satuan pendidikan." },
  { nama: "Penulisan Karya Tulis Ilmiah & Buku Siap Terbit",
    sasaran: "Guru, pengawas, tenaga kependidikan",
    fokus: "Pendampingan menulis artikel, PTK/PTS, hingga naskah buku yang siap diterbitkan." },
  { nama: "Percepatan Administrasi Guru dengan AI",
    sasaran: "Guru, wali kelas, tenaga kependidikan",
    fokus: "Menyusun Prota, Prosem, TP dan ATP, modul ajar, jurnal harian, dan dokumen administrasi lain dengan bantuan AI." },
  { nama: "Pembuatan Video Pembelajaran",
    sasaran: "Guru semua jenjang",
    fokus: "Memproduksi video pembelajaran dan komik digital interaktif menggunakan AI dan aplikasi digital." },
  { nama: "Konsultasi & Pendampingan Akreditasi",
    sasaran: "Kepala sekolah/madrasah, tim akreditasi",
    fokus: "Penyiapan dokumen dan strategi menghadapi visitasi akreditasi BAN-PDM." }
];

const SKEMA = [
  { k: "Metode",       v: "Tatap muka (luring), daring, atau hybrid, menyesuaikan kondisi satuan pendidikan." },
  { k: "Durasi",       v: "Workshop 1 hari, pelatihan 2–3 hari, atau pendampingan berkelanjutan dalam beberapa sesi." },
  { k: "Peserta",      v: "Disesuaikan kapasitas sekolah atau komunitas, dari kelompok kecil sampai massal." },
  { k: "Perangkat",    v: "Materi pelatihan, lembar kerja, dan pendampingan tindak lanjut setelah pelatihan." },
  { k: "Kerja sama",   v: "Undangan narasumber, program berkelanjutan, atau kolaborasi dengan instansi dan komunitas pendidikan." }
];

/* ---------------------------------------------------------------------
   Profil (bagian Tentang), bersumber dari proposal
   --------------------------------------------------------------------- */
const PROFIL = {
  bio: [
    "Nuraini, M.Pd. adalah Widyaiswara pada Pusat Pengembangan Kompetensi SDM Pendidikan dan Keagamaan, Kementerian Agama Republik Indonesia, sekaligus kandidat Doktor (S3) Pendidikan dengan fokus riset pada inovasi pembelajaran berbasis AI dan Design Thinking.",
    "Selain sebagai fasilitator pelatihan, beliau aktif sebagai narasumber, asesor akreditasi sekolah/madrasah, mentor, penulis, dan pengembang media pembelajaran digital."
  ],
  angka: [
    { n: "22+", t: "tahun mengajar dan melatih" },
    { n: "10",  t: "publikasi ilmiah terindeks" },
    { n: "23",  t: "sitasi di ResearchGate" },
    { n: "2",   t: "penghargaan nasional" }
  ],
  keahlian: [
    "Artificial Intelligence (AI) untuk Pendidikan",
    "Media pembelajaran interaktif (Canva, NotebookLM, game edukatif)",
    "Pengembangan kompetensi guru dan tenaga kependidikan",
    "Deep Learning dan pembelajaran berdiferensiasi",
    "Kurikulum Berbasis Cinta (KBC) dan Kurikulum Merdeka",
    "Design Thinking dalam pengembangan pembelajaran",
    "Digital Learning & MOOC",
    "Karya tulis ilmiah dan buku siap terbit",
    "Konsultasi akreditasi sekolah/madrasah"
  ],
  pendidikan: [
    "S1 Pendidikan Biologi, FPMIPA, Universitas Negeri Jakarta (2003)",
    "S2 Penilaian dan Evaluasi Pendidikan, UHAMKA (2017)",
    "S3 Ilmu Pendidikan, UHAMKA (sedang berjalan)"
  ],
  pengalaman: [
    "Widyaiswara, Pusbangkom SDM Pendidikan dan Keagamaan, Kementerian Agama RI (2014–sekarang)",
    "Asesor BAN-PDM DKI Jakarta, jenjang PAUD sampai SMA/MA/SLB (sejak 2015)",
    "Asesor Kompetensi, LSP Badan Litbang dan Diklat (sejak 2024)",
    "Asesor Program Pelatihan Teknis Substantif Pendidikan dan Keagamaan (sejak 2017)",
    "Pengajar Pelatihan Fasilitator Pembelajaran Digital & Video Production for Government Campaign, Komdigi (2022–sekarang)",
    "Shortcourse Pemanfaatan AI & Korean Culture, Saekyung University, Korea Selatan (2025)"
  ],
  prestasi: [
    "Pemakalah Terbaik I, Pertemuan Ilmiah Tahunan Nasional Widyaiswara 2025, Asosiasi Profesi Widyaiswara Indonesia (APWI)",
    "Finalis 40 Karya Ilmiah Terbaik, Konferensi Ilmiah Nasional Fasilitator dan Trainer 2026, Balai Diklat Keagamaan Denpasar"
  ],
  publikasi: [
    "Validation of Teacher Digital Literacy Instrument Based on Pedagogical Task Functions: A Rasch Model and SEM-PLS Approach (2025)",
    "Kecerdasan Buatan dalam Pendidikan: Menjawab Tantangan dan Merancang Solusi Inklusif, Inovasi: Jurnal Diklat Keagamaan (2025)",
    "Antara Visi dan Realitas: Evaluasi Implementasi Kurikulum Holistik Integratif di Sekolah Muhammadiyah, Widyadewata (2025)",
    "Implementasi Evaluasi Model Kirkpatrick (Level 1 dan 2) pada Diklat Teknis Substantif, Andragogi: Jurnal Diklat Teknis Pendidikan dan Keagamaan (2017)"
  ]
};
