/* Etalase: membaca data dari js/karya.js */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null && text !== "") n.textContent = text;
    return n;
  }
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ICONS = {
    game: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="6" y="18" width="52" height="30" rx="15"/><path d="M20 27v12M14 33h12"/><circle cx="42" cy="30" r="2.2"/><circle cx="48" cy="36" r="2.2"/></svg>',
    lab:  '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M26 8h12M28 8v18L12 52a4 4 0 0 0 3.5 6h33a4 4 0 0 0 3.5-6L36 26V8"/><path d="M19 42h26"/></svg>',
    ar:   '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 16l15 8.5v17L32 50l-15-8.5v-17z"/><path d="M32 33l15-8.5M32 33l-15-8.5M32 33v17"/><path d="M8 18V8h10M56 18V8H46M8 46v10h10M56 46v10H46"/></svg>',
    lain: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="12" width="48" height="36" rx="6"/><path d="M28 22l12 8-12 8z"/><path d="M20 56h24"/></svg>'
  };
  var WARNA = { game: "var(--game)", lab: "var(--lab)", ar: "var(--ar)", lain: "var(--lain)" };

  var katNama = {};
  KATEGORI.forEach(function (k) { katNama[k.id] = k.nama; });

  function wa(teks) {
    var u = "https://wa.me/" + SITE.whatsapp;
    return teks ? u + "?text=" + encodeURIComponent(teks) : u;
  }

  /* ---------- teks umum dari SITE ---------- */
  document.title = SITE.nama + " — Game Edukasi, Lab Maya, dan AR";
  document.querySelectorAll("[data-site]").forEach(function (n) {
    var v = SITE[n.getAttribute("data-site")];
    if (typeof v === "string") n.textContent = v;
  });
  $("#tahun").textContent = new Date().getFullYear();

  if (SITE.whatsapp) {
    $("#btn-wa-top").href = wa("Halo Bu Nuraini, saya ingin bertanya tentang program pelatihan Nuraini Learning Hub.");
    $("#btn-wa").href = wa("Halo Bu Nuraini, saya ingin berdiskusi tentang kolaborasi dan program pelatihan.");
    $("#btn-ajukan").href = wa("Halo Bu Nuraini, saya ingin mengajukan program pelatihan untuk sekolah/madrasah/komunitas kami.");
  } else {
    $("#btn-wa-top").hidden = true; $("#btn-wa").hidden = true; $("#btn-ajukan").hidden = true;
  }
  if (SITE.email) {
    var be = $("#btn-email");
    be.href = "mailto:" + SITE.email; be.hidden = false;
  }

  /* ---------- strip "Dibuat dengan" ---------- */
  var tools = $("#tools");
  SITE.dibuatDengan.forEach(function (t) { tools.appendChild(el("li", "", t)); });
  if (!SITE.dibuatDengan.length) $(".tools").hidden = true;

  /* ---------- jumlah di hero ---------- */
  var kategoriTerpakai = {};
  KARYA.forEach(function (k) { kategoriTerpakai[k.kategori] = true; });
  $("#hero-count").textContent =
    KARYA.length + " karya dalam " + Object.keys(kategoriTerpakai).length + " kategori";

  /* ---------- status tampilan ---------- */
  var state = { tab: "saya", kat: "semua", q: "" };
  function data() { return state.tab === "saya" ? KARYA : KARYA_PESERTA; }

  var chips = $("#chips"), grid = $("#grid"), empty = $("#empty"), line = $("#resultline");
  var cari = $("#cari");

  /* ---------- tab ---------- */
  $("#n-saya").textContent = KARYA.length;
  $("#n-peserta").textContent = KARYA_PESERTA.length;
  document.querySelectorAll(".tab").forEach(function (t) {
    t.addEventListener("click", function () { pilihTab(t.dataset.tab); });
  });
  function pilihTab(nama) {
    state.tab = nama; state.kat = "semua";
    document.querySelectorAll(".tab").forEach(function (t) {
      t.setAttribute("aria-selected", t.dataset.tab === nama ? "true" : "false");
    });
    buatChip(); render();
  }

  /* ---------- chip kategori ---------- */
  function hitung(id) {
    return data().filter(function (k) { return id === "semua" || k.kategori === id; }).length;
  }
  function chip(id, nama, n, warna) {
    var b = el("button", "chip"); b.type = "button"; b.dataset.kat = id;
    b.setAttribute("aria-pressed", id === state.kat ? "true" : "false");
    if (warna) { var d = el("span", "chip__dot"); d.style.setProperty("--c", warna); b.appendChild(d); }
    b.appendChild(document.createTextNode(nama + " "));
    b.appendChild(el("span", "chip__n", n));
    return b;
  }
  function buatChip() {
    chips.textContent = "";
    if (!data().length) { chips.hidden = true; return; }
    chips.hidden = false;
    chips.appendChild(chip("semua", "Semua", hitung("semua")));
    KATEGORI.forEach(function (k) {
      var n = hitung(k.id);
      if (n) chips.appendChild(chip(k.id, k.nama, n, WARNA[k.id]));
    });
  }
  chips.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    state.kat = b.dataset.kat;
    chips.querySelectorAll(".chip").forEach(function (c) {
      c.setAttribute("aria-pressed", c === b ? "true" : "false");
    });
    render();
  });

  /* ---------- strip bidang (dari kolom mapel) ---------- */
  var bidangBox = $("#bidang-chips");
  function buatBidang() {
    var hit = {};
    KARYA.forEach(function (k) { if (k.mapel) hit[k.mapel] = (hit[k.mapel] || 0) + 1; });
    var daftar = Object.keys(hit).sort(function (a, b) { return hit[b] - hit[a] || a.localeCompare(b); });
    if (!daftar.length) { $("#bidang").hidden = true; return; }
    daftar.forEach(function (m) {
      var b = el("button", "pill"); b.type = "button"; b.dataset.mapel = m;
      b.setAttribute("aria-pressed", "false");
      b.appendChild(document.createTextNode(m + " "));
      b.appendChild(el("span", "pill__n", hit[m]));
      bidangBox.appendChild(b);
    });
  }
  function syncBidang() {
    bidangBox.querySelectorAll(".pill").forEach(function (p) {
      var on = state.q && state.q === p.dataset.mapel.toLowerCase();
      p.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }
  bidangBox.addEventListener("click", function (e) {
    var p = e.target.closest(".pill"); if (!p) return;
    var aktif = p.getAttribute("aria-pressed") === "true";
    state.q = aktif ? "" : p.dataset.mapel.toLowerCase();
    cari.value = aktif ? "" : p.dataset.mapel;
    if (state.tab !== "saya") pilihTab("saya");
    state.kat = "semua"; buatChip(); render();
    $("#karya").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  });

  /* ---------- pencarian ---------- */
  cari.addEventListener("input", function (e) {
    state.q = e.target.value.trim().toLowerCase(); render();
  });
  $("#reset").addEventListener("click", function () {
    state.kat = "semua"; state.q = ""; cari.value = ""; buatChip(); render();
  });

  /* ---------- toast & salin ---------- */
  var toastEl = $("#toast"), toastT;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }
  function salin(teks) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(teks).then(function () { toast("Tautan disalin"); },
        function () { toast("Tautan tidak bisa disalin"); });
      return;
    }
    var ta = document.createElement("textarea");
    ta.value = teks; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast("Tautan disalin"); }
    catch (err) { toast("Tautan tidak bisa disalin"); }
    document.body.removeChild(ta);
  }

  /* ---------- kartu karya ---------- */
  function kartu(k) {
    var card = el("article", "card" + (k.unggulan ? " card--featured" : ""));
    card.dataset.cat = k.kategori;

    var cover = el("div", "cover");
    if (k.gambar) {
      var img = document.createElement("img");
      img.src = k.gambar; img.alt = ""; img.loading = "lazy";
      cover.appendChild(img);
    } else {
      cover.innerHTML = ICONS[k.kategori] || ICONS.lain;
    }
    cover.appendChild(el("span", "badge", katNama[k.kategori] || "Karya"));
    if (k.demo) cover.appendChild(el("span", "badge badge--demo", "Data contoh"));
    card.appendChild(cover);

    var body = el("div", "card__body");
    body.appendChild(el("h3", "", k.judul));
    if (k.pembuat) body.appendChild(el("p", "card__by", "Oleh " + k.pembuat));
    if (k.deskripsi) body.appendChild(el("p", "", k.deskripsi));
    var tags = el("div", "tags");
    [k.mapel, k.jenjang].forEach(function (t) { if (t) tags.appendChild(el("span", "tag", t)); });
    body.appendChild(tags);
    card.appendChild(body);

    var act = el("div", "card__actions");
    if (k.link) {
      var buka = el("a", "btn btn--primary btn--sm", "Buka karya");
      buka.href = k.link; buka.target = "_blank"; buka.rel = "noopener";
      buka.setAttribute("aria-label", "Buka karya: " + k.judul);
      act.appendChild(buka);
      var cp = el("button", "btn btn--ghost btn--sm", "Salin tautan");
      cp.type = "button";
      cp.addEventListener("click", function () { salin(k.link); });
      act.appendChild(cp);
    } else {
      var soon = el("span", "btn btn--primary btn--sm", "Segera hadir");
      soon.setAttribute("aria-disabled", "true");
      act.appendChild(soon);
    }
    card.appendChild(act);
    return card;
  }

  function cocok(k) {
    if (state.kat !== "semua" && k.kategori !== state.kat) return false;
    if (!state.q) return true;
    var s = [k.judul, k.deskripsi, k.mapel, k.jenjang, k.pembuat, katNama[k.kategori]].join(" ").toLowerCase();
    return s.indexOf(state.q) !== -1;
  }

  function render() {
    var semua = data();
    var hasil = semua.filter(cocok);
    grid.textContent = "";
    hasil.forEach(function (k) { grid.appendChild(kartu(k)); });
    var kosongTotal = semua.length === 0;
    empty.hidden = hasil.length > 0;
    $("#reset").hidden = kosongTotal;
    $("#empty-teks").textContent = kosongTotal
      ? "Karya peserta pelatihan akan tampil di sini setelah kelas berjalan."
      : "Belum ada karya yang cocok dengan pencarian ini.";
    line.textContent = kosongTotal ? "" : "Menampilkan " + hasil.length + " dari " + semua.length + " karya";
    syncBidang();
  }

  /* ---------- program pelatihan ---------- */
  var pg = $("#program-grid");
  PROGRAM.forEach(function (p) {
    var a = el("article", "prog");
    a.appendChild(el("h3", "", p.nama));
    a.appendChild(el("p", "prog__for", "Untuk: " + p.sasaran));
    a.appendChild(el("p", "prog__fokus", p.fokus));
    pg.appendChild(a);
  });
  var sk = $("#skema");
  SKEMA.forEach(function (s) {
    var row = el("div", "skema__row");
    row.appendChild(el("dt", "", s.k));
    row.appendChild(el("dd", "", s.v));
    sk.appendChild(row);
  });

  /* ---------- tentang ---------- */
  var bio = $("#bio");
  PROFIL.bio.forEach(function (t) { bio.appendChild(el("p", "", t)); });
  var ang = $("#angka");
  PROFIL.angka.forEach(function (a) {
    var d = el("div", "angka__item");
    d.appendChild(el("dt", "", a.t));
    d.appendChild(el("dd", "", a.n));
    ang.appendChild(d);
  });
  var kh = $("#keahlian");
  PROFIL.keahlian.forEach(function (t) { kh.appendChild(el("li", "", t)); });

  var riwayat = $("#riwayat");
  [
    ["Pendidikan", PROFIL.pendidikan, true],
    ["Pengalaman", PROFIL.pengalaman, false],
    ["Prestasi dan penghargaan", PROFIL.prestasi, false],
    ["Publikasi terpilih", PROFIL.publikasi, false]
  ].forEach(function (g) {
    var d = el("details", "acc");
    if (g[2]) d.open = true;
    d.appendChild(el("summary", "", g[0]));
    var ul = el("ul", "acc__list");
    g[1].forEach(function (t) { ul.appendChild(el("li", "", t)); });
    d.appendChild(ul);
    riwayat.appendChild(d);
  });
  var rg = SITE.sosial.filter(function (s) { return s.label === "ResearchGate" && s.url; })[0];
  if (rg) {
    var pl = el("p", "acc__more");
    var al = el("a", "", "Profil dan publikasi lengkap di ResearchGate");
    al.href = rg.url; al.target = "_blank"; al.rel = "noopener";
    pl.appendChild(al); riwayat.appendChild(pl);
  }

  /* ---------- kontak: media sosial ---------- */
  var sosial = $("#sosial");
  SITE.sosial.forEach(function (s) {
    var li = el("li");
    var isi = s.url ? el("a", "sosial__item") : el("span", "sosial__item sosial__item--teks");
    if (s.url) { isi.href = s.url; isi.target = "_blank"; isi.rel = "noopener"; }
    isi.appendChild(el("strong", "", s.label));
    if (s.akun) isi.appendChild(el("span", "", s.akun));
    li.appendChild(isi); sosial.appendChild(li);
  });

  /* ---------- mulai ---------- */
  buatBidang();
  buatChip();
  render();
})();
