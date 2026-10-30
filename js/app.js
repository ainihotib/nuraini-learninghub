/* Etalase: membaca SITE, KATEGORI, dan KARYA dari js/karya.js */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };

  var ICONS = {
    game: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="6" y="18" width="52" height="30" rx="15"/><path d="M20 27v12M14 33h12"/><circle cx="42" cy="30" r="2.2"/><circle cx="48" cy="36" r="2.2"/></svg>',
    lab:  '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M26 8h12M28 8v18L12 52a4 4 0 0 0 3.5 6h33a4 4 0 0 0 3.5-6L36 26V8"/><path d="M19 42h26"/></svg>',
    ar:   '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 16l15 8.5v17L32 50l-15-8.5v-17z"/><path d="M32 33l15-8.5M32 33l-15-8.5M32 33v17"/><path d="M8 18V8h10M56 18V8H46M8 46v10h10M56 46v10H46"/></svg>',
    lain: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="12" width="48" height="36" rx="6"/><path d="M28 22l12 8-12 8z"/><path d="M20 56h24"/></svg>'
  };

  var state = { kat: "semua", q: "" };
  var katNama = {};
  KATEGORI.forEach(function (k) { katNama[k.id] = k.nama; });

  /* ---------- isi teks dari SITE ---------- */
  document.title = SITE.nama + " — Game Edukasi, Lab Maya, dan AR";
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var v = SITE[el.getAttribute("data-site")];
    if (typeof v === "string") el.textContent = v;
  });
  $("#tahun").textContent = new Date().getFullYear();

  var tentang = $("#tentang-teks");
  SITE.tentang.forEach(function (t) {
    var p = document.createElement("p");
    p.textContent = t;
    tentang.appendChild(p);
  });

  var sosial = $("#sosial");
  var adaSosial = false;
  SITE.sosial.forEach(function (s) {
    if (!s.url) return;
    adaSosial = true;
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = s.url; a.target = "_blank"; a.rel = "noopener";
    a.textContent = s.label;
    li.appendChild(a); sosial.appendChild(li);
  });
  if (!adaSosial) sosial.hidden = true;

  var kontak = $("#btn-kontak");
  if (SITE.kontakUrl) { kontak.href = SITE.kontakUrl; kontak.hidden = false; }

  $("#hero-count").textContent =
    KARYA.length + " karya dalam " + KATEGORI.length + " kategori";

  /* ---------- chip kategori ---------- */
  var chips = $("#chips");
  function buatChip(id, nama, n, warna) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.dataset.kat = id;
    b.setAttribute("aria-pressed", id === state.kat ? "true" : "false");
    if (warna) {
      var d = document.createElement("span");
      d.className = "chip__dot"; d.style.setProperty("--c", warna);
      b.appendChild(d);
    }
    b.appendChild(document.createTextNode(nama + " "));
    var c = document.createElement("span");
    c.className = "chip__n"; c.textContent = n;
    b.appendChild(c);
    return b;
  }
  var warnaKat = { game: "var(--game)", lab: "var(--lab)", ar: "var(--ar)", lain: "var(--lain)" };
  function hitung(id) {
    return KARYA.filter(function (k) { return id === "semua" || k.kategori === id; }).length;
  }
  chips.appendChild(buatChip("semua", "Semua", hitung("semua")));
  KATEGORI.forEach(function (k) {
    chips.appendChild(buatChip(k.id, k.nama, hitung(k.id), warnaKat[k.id]));
  });
  chips.addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    state.kat = b.dataset.kat;
    chips.querySelectorAll(".chip").forEach(function (c) {
      c.setAttribute("aria-pressed", c === b ? "true" : "false");
    });
    render();
  });

  /* ---------- pencarian ---------- */
  $("#cari").addEventListener("input", function (e) {
    state.q = e.target.value.trim().toLowerCase();
    render();
  });
  $("#reset").addEventListener("click", function () {
    state.kat = "semua"; state.q = ""; $("#cari").value = "";
    chips.querySelectorAll(".chip").forEach(function (c) {
      c.setAttribute("aria-pressed", c.dataset.kat === "semua" ? "true" : "false");
    });
    render();
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

  /* ---------- kartu ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

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

  /* ---------- render ---------- */
  var grid = $("#grid"), empty = $("#empty"), line = $("#resultline");
  function cocok(k) {
    if (state.kat !== "semua" && k.kategori !== state.kat) return false;
    if (!state.q) return true;
    var s = [k.judul, k.deskripsi, k.mapel, k.jenjang, katNama[k.kategori]].join(" ").toLowerCase();
    return s.indexOf(state.q) !== -1;
  }
  function render() {
    var hasil = KARYA.filter(cocok);
    grid.textContent = "";
    hasil.forEach(function (k) { grid.appendChild(kartu(k)); });
    empty.hidden = hasil.length > 0;
    line.textContent = "Menampilkan " + hasil.length + " dari " + KARYA.length + " karya";
  }
  render();
})();
