# Galeri Karya

Etalase karya: game edukasi, lab maya, dan pengalaman AR. Web statis (HTML, CSS, JavaScript biasa), tanpa proses build.

## Struktur

```
web-karya/
├── index.html        halaman utama
├── css/style.css     tampilan (palet navy dan orange ada di bagian :root paling atas)
├── img/banner.webp   banner di bagian atas halaman (ganti berkas ini untuk mengganti banner)
├── js/
│   ├── karya.js      ← SATU-SATUNYA berkas yang biasa Anda ubah (data situs dan daftar karya)
│   ├── app.js        logika kartu, filter, pencarian
│   └── hero.js       simulasi "Meriam Mini" di bagian atas
├── README.md
└── PANDUAN-DEPLOY.md panduan publikasi ke GitHub Pages atau Vercel
```

## Mengganti data dengan karya Anda

Buka `js/karya.js`. Semua teks situs ada di sini:

1. `SITE`: nama, tagline, WhatsApp (`whatsapp`, format 62...), email, daftar "Dibuat dengan", dan akun media sosial (isi `url` agar menjadi tautan).
2. `KARYA`: karya Anda. Salin satu blok `{ ... }`, ubah isinya, dan **hapus baris `demo: true`** agar label "Data contoh" hilang.
3. `KARYA_PESERTA`: karya peserta pelatihan (tab "Karya peserta"), format sama dengan `KARYA` plus `pembuat`.
4. `PROGRAM`, `SKEMA`, `PROFIL`: isi bagian Program pelatihan dan Tentang.

Contoh satu karya:

```js
{
  judul: "Simulasi Hukum Hooke",
  deskripsi: "Tarik pegas virtual dan amati hubungan gaya dengan pertambahan panjang.",
  kategori: "lab",            // game | lab | ar | lain
  mapel: "Fisika",
  jenjang: "SMA",
  link: "https://alamat-karya-anda.example/",
  gambar: "img/hooke.jpg",    // opsional; letakkan gambar di folder img/
  unggulan: false             // true = kartu tampil lebih lebar
}
```

Kalau `link` dikosongkan, tombol berubah menjadi "Segera hadir".

## Menambah kategori

Tambahkan satu baris di `KATEGORI` dan satu warna di `css/style.css` (variabel `--nama` dan aturan `.card[data-cat="nama"]`). Ikon bawaan kategori baru memakai ikon "media lain" sampai Anda menambahkannya di `js/app.js` (objek `ICONS`).

## Mencoba di komputer

Cukup buka `index.html` di browser. Atau, dari folder ini:

```
python -m http.server 8000
```

lalu buka http://localhost:8000.
