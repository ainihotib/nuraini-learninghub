# Panduan Publikasi Galeri Karya

Ada dua jalan. Hasilnya sama, pilih salah satu.

- **A. GitHub Pages**: paling sederhana, alamatnya `https://ainihotib.github.io/NAMA-REPO/`.
- **B. Vercel**: alamat lebih ringkas, deploy otomatis tiap Anda push, dan siap ditambah fungsi server nanti untuk fitur kelas. Cek syarat paket gratis Vercel (Hobby) sebelum dipakai untuk kegiatan berbayar.

Kedua jalan dimulai dengan langkah 1 sampai 5 yang sama.

---

## Satu hal yang paling sering salah

**Folder yang di-`git init` harus folder yang langsung berisi `index.html`.**
Setelah ZIP diekstrak, folder itu bernama `web-karya`. Jangan masuk lebih dalam, jangan naik satu tingkat. Kalau salah, semua perintah Git tetap "berhasil" tetapi situs 404.

---

## Langkah 1. Buat repository kosong di GitHub

1. Buka https://github.com/new
2. Repository name: `galeri-karya` (bebas)
3. Pilih **Public**
4. **Jangan** centang README, .gitignore, atau license
5. Klik **Create repository**

## Langkah 2. Buka terminal di folder yang benar

Windows: buka folder `web-karya` di File Explorer, klik address bar, ketik `powershell`, lalu Enter.

## Langkah 3. Pastikan isi folder benar

```powershell
dir
```

Yang harus terlihat: `index.html`, `css`, `js`, `README.md`. Kalau yang terlihat justru folder `web-karya`, Anda satu tingkat terlalu tinggi: jalankan `cd web-karya` dulu.

## Langkah 4. Isi data Anda (sebelum push pertama)

Buka `js/karya.js`, ganti data contoh dengan karya Anda (lihat README.md). Boleh juga ditunda dan diperbarui sesudah situs tayang.

## Langkah 5. Kirim ke GitHub

Jalankan satu per satu:

```powershell
git init
git add .
git commit -m "Upload pertama"
git branch -M main
git remote add origin https://github.com/ainihotib/galeri-karya.git
git push -u origin main
```

(Ganti `galeri-karya` kalau nama repository Anda berbeda. Titik di `git add .` wajib ada.)

Saat diminta password, tempel **Personal Access Token** (bukan password akun). Layar tidak menampilkan apa pun saat Anda menempel; itu normal. Bila token belum ada: https://github.com/settings/tokens → Generate new token (classic) → centang `repo`.

Tanda berhasil: muncul `* [new branch] main -> main`. Buka repository di browser dan pastikan `index.html` terlihat di daftar paling atas.

---

## Jalan A. GitHub Pages

1. Di repository: **Settings → Pages**
2. Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)** → **Save**
3. Centang **Enforce HTTPS**
4. Tunggu 1 sampai 2 menit, lalu buka `https://ainihotib.github.io/galeri-karya/`

## Jalan B. Vercel

1. Buka https://vercel.com/new, pilih repository `galeri-karya` → **Import**
2. Framework Preset: **Other**. Kosongkan Build Command dan Output Directory.
3. Klik **Deploy**. Dalam sekitar satu menit situs tayang di alamat `*.vercel.app`.

---

## Memperbarui isi situs

Setiap kali Anda mengubah `js/karya.js` atau berkas lain, jalankan dari folder yang sama:

```powershell
git add .
git commit -m "Tambah karya baru"
git push
```

Situs ikut diperbarui dalam 1 sampai 2 menit. Bila masih tampil versi lama, tekan **Ctrl+Shift+R**.

## Bila ada masalah

| Gejala | Penyebab | Solusi |
|---|---|---|
| Halaman 404 | `index.html` tidak di root repository | Buka repo di GitHub; kalau yang terlihat folder `web-karya`, push ulang dari dalam folder itu dengan `git push -u origin main --force` |
| Tampil tanpa gaya | Folder `css` atau `js` tidak ikut | Cek di GitHub apakah ada folder `css` dan `js` |
| `Password authentication is not supported` | Butuh token | Buat Personal Access Token (lihat Langkah 5) |
| `remote origin already exists` | Sudah pernah disambungkan | Lewati baris itu, lanjut `git push` |
| Karya tidak berubah | Cache browser | Ctrl+Shift+R atau jendela Incognito |
