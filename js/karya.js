/* =====================================================================
   DATA SITUS DAN DAFTAR KARYA
   Hanya berkas ini yang perlu Anda ubah untuk memperbarui isi web.
   ===================================================================== */

const SITE = {
  nama: "Galeri Karya Nuraini",            // nama di header dan judul tab
  pembuat: "Nuraini, M.Pd.",
  tagline: "Game edukasi, lab maya, dan pengalaman AR untuk kelas.",
  tentang: [
    "Saya widyaiswara di bidang pendidikan yang merancang media belajar interaktif: game edukasi, laboratorium maya, dan pengalaman berbasis AR.",
    "Semua karya di sini dibuat agar guru dan siswa bisa langsung mencobanya di browser, lalu menyesuaikannya untuk kelas masing-masing."
  ],
  // Tautan kontak/pendaftaran kelas, misalnya https://wa.me/62... atau tautan formulir.
  // Kosongkan ("") untuk menyembunyikan tombol.
  kontakUrl: "",
  // Tautan sosial. Entri dengan url kosong tidak ditampilkan.
  sosial: [
    { label: "GitHub",    url: "https://github.com/ainihotib" },
    { label: "Instagram", url: "" },
    { label: "TikTok",    url: "" },
    { label: "Facebook",  url: "" },
    { label: "YouTube",   url: "" }
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
   Daftar karya. Karya terbaru taruh paling atas.
   Isian:
     judul      wajib
     deskripsi  satu sampai dua kalimat
     kategori   game | lab | ar | lain
     mapel      misalnya "Fisika"
     jenjang    misalnya "SMA", "SMP–SMA", "SD"
     link       tautan karya; kosong = tombol menjadi "Segera hadir"
     gambar     (opsional) alamat gambar sampul, misalnya "img/parabola.jpg"
     unggulan   true = kartu tampil lebih lebar
     demo       true = muncul label "Data contoh". HAPUS baris ini saat
                mengganti dengan karya asli.
   --------------------------------------------------------------------- */
const KARYA = [
  {
    judul: "Simulasi Gerak Parabola",
    deskripsi: "Atur sudut dan kecepatan, lalu amati lintasan peluru terbentuk dan hitung jangkauannya.",
    kategori: "lab", mapel: "Fisika", jenjang: "SMA",
    link: "", unggulan: true, demo: true
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
  },
  {
    judul: "Rangkaian Listrik AR",
    deskripsi: "Susun komponen di meja nyata, lihat arus mengalir lewat tampilan AR.",
    kategori: "ar", mapel: "Fisika", jenjang: "SMP",
    link: "", demo: true
  },
  {
    judul: "Kuis Rantai Makanan",
    deskripsi: "Susun rantai makanan yang benar dan lihat dampaknya pada ekosistem.",
    kategori: "game", mapel: "Biologi", jenjang: "SMP",
    link: "", demo: true
  },
  {
    judul: "Video Ajar Interaktif Ekosistem",
    deskripsi: "Video pembelajaran dengan pertanyaan di tengah tayangan untuk menjaga fokus siswa.",
    kategori: "lain", mapel: "Biologi", jenjang: "SMP",
    link: "", demo: true
  },
  {
    judul: "Infografis Siklus Air",
    deskripsi: "Infografis yang bisa diklik per tahap, lengkap dengan pertanyaan pemantik.",
    kategori: "lain", mapel: "IPAS", jenjang: "SD",
    link: "", demo: true
  }
];
