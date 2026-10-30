/* Meriam Mini: simulasi gerak parabola di bagian hero */
(function () {
  "use strict";
  var cv = document.getElementById("minilab");
  if (!cv) return;
  var ctx = cv.getContext("2d");

  var W = 560, H = 320;
  var G = 9.8, SCALE = 3;            // 1 m = 3 piksel
  var X0 = 44, GROUND = H - 44;      // posisi meriam dan tanah
  var TOLERANSI = 4;                 // meter
  var TIME_SCALE = 3;                // percepat waktu agar enak ditonton

  var inSudut = document.getElementById("in-sudut");
  var inKec = document.getElementById("in-kec");
  var outSudut = document.getElementById("out-sudut");
  var outKec = document.getElementById("out-kec");
  var btnTembak = document.getElementById("btn-tembak");
  var btnTarget = document.getElementById("btn-target");
  var statusEl = document.getElementById("minilab-status");

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var css = getComputedStyle(document.documentElement);
  var C = {
    ink: css.getPropertyValue("--ink").trim() || "#12203A",
    muted: css.getPropertyValue("--muted").trim() || "#52617D",
    lab: css.getPropertyValue("--lab").trim() || "#0F8FA0",
    game: css.getPropertyValue("--game").trim() || "#E8890C",
    grid: css.getPropertyValue("--grid").trim() || "#DDE4F0"
  };

  var target = acak();
  var trail = [];
  var ball = null;          // {x, y} dalam meter, atau null
  var anim = null;
  var streak = 0;

  function acak() { return Math.round(40 + Math.random() * 100); }
  function koma(n) { return n.toFixed(1).replace(".", ","); }
  function rad(d) { return d * Math.PI / 180; }

  function setup() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  function px(m) { return X0 + m * SCALE; }
  function py(m) { return GROUND - m * SCALE; }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // garis bantu tegak tiap 20 m
    ctx.font = "11px Figtree, system-ui, sans-serif";
    ctx.textAlign = "center";
    for (var m = 0; m <= 160; m += 20) {
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(px(m), 14); ctx.lineTo(px(m), GROUND); ctx.stroke();
      ctx.fillStyle = C.muted;
      ctx.fillText(m + " m", px(m), GROUND + 20);
    }

    // tanah
    ctx.strokeStyle = C.ink; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, GROUND); ctx.lineTo(W, GROUND); ctx.stroke();

    // zona kena
    ctx.fillStyle = "rgba(30, 79, 216, .2)";
    ctx.fillRect(px(target - TOLERANSI), GROUND - 8, TOLERANSI * 2 * SCALE, 8);

    // bendera sasaran
    var fx = px(target);
    ctx.strokeStyle = C.ink; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(fx, GROUND); ctx.lineTo(fx, GROUND - 40); ctx.stroke();
    ctx.fillStyle = C.game;
    ctx.beginPath(); ctx.moveTo(fx, GROUND - 40); ctx.lineTo(fx + 22, GROUND - 33); ctx.lineTo(fx, GROUND - 26); ctx.closePath(); ctx.fill();

    // jejak
    ctx.fillStyle = C.lab;
    for (var i = 0; i < trail.length; i += 2) {
      ctx.beginPath(); ctx.arc(px(trail[i].x), py(trail[i].y), 2.2, 0, 6.2832); ctx.fill();
    }

    // meriam
    var a = rad(+inSudut.value);
    ctx.save();
    ctx.translate(X0, GROUND - 12);
    ctx.rotate(-a);
    ctx.fillStyle = C.ink;
    ctx.fillRect(-4, -6, 38, 12);
    ctx.restore();
    ctx.fillStyle = C.ink;
    ctx.beginPath(); ctx.arc(X0, GROUND - 12, 11, 0, 6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(X0 - 6, GROUND - 5, 8, 0, 6.2832); ctx.fill();

    // peluru
    if (ball) {
      ctx.fillStyle = C.game; ctx.strokeStyle = C.ink; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(px(ball.x), py(ball.y), 6, 0, 6.2832); ctx.fill(); ctx.stroke();
    }
  }

  function posisi(v, a, t) {
    return { x: v * Math.cos(a) * t, y: v * Math.sin(a) * t - 0.5 * G * t * t };
  }

  function selesai(jarak) {
    var selisih = jarak - target;
    if (Math.abs(selisih) <= TOLERANSI) {
      streak += 1;
      statusEl.innerHTML = "<strong>Kena!</strong> Peluru jatuh di " + koma(jarak) +
        " m, sasaran di " + target + " m." + (streak > 1 ? " Beruntun " + streak + " kali." : "");
    } else {
      streak = 0;
      statusEl.textContent = "Meleset: peluru jatuh di " + koma(jarak) + " m, " +
        (selisih < 0 ? "kurang " : "lebih ") + koma(Math.abs(selisih)) + " m dari sasaran.";
    }
    btnTembak.disabled = false;
  }

  function tembak() {
    if (anim) cancelAnimationFrame(anim);
    var v = +inKec.value, a = rad(+inSudut.value);
    var T = 2 * v * Math.sin(a) / G;
    var jarak = v * v * Math.sin(2 * a) / G;
    trail = [];
    btnTembak.disabled = true;
    statusEl.textContent = "Peluru meluncur…";

    if (reduce) {
      for (var t = 0; t <= T; t += T / 40) trail.push(posisi(v, a, t));
      ball = null; draw(); selesai(jarak);
      return;
    }

    var mulai = null;
    function langkah(now) {
      if (mulai === null) mulai = now;
      var t = (now - mulai) / 1000 * TIME_SCALE;
      if (t >= T) {
        ball = { x: jarak, y: 0 };
        trail.push(ball);
        draw();
        ball = null; draw();
        anim = null; selesai(jarak);
        return;
      }
      ball = posisi(v, a, t);
      trail.push(ball);
      draw();
      anim = requestAnimationFrame(langkah);
    }
    anim = requestAnimationFrame(langkah);
  }

  function ubahKontrol() {
    outSudut.textContent = inSudut.value + "°";
    outKec.textContent = inKec.value + " m/s";
    if (!anim) { trail = []; ball = null; draw(); }
  }

  inSudut.addEventListener("input", ubahKontrol);
  inKec.addEventListener("input", ubahKontrol);
  btnTembak.addEventListener("click", tembak);
  btnTarget.addEventListener("click", function () {
    if (anim) { cancelAnimationFrame(anim); anim = null; btnTembak.disabled = false; }
    target = acak(); trail = []; ball = null; draw();
    statusEl.textContent = "Sasaran baru ada di " + target + " m. Selamat mencoba.";
  });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  setup();
})();
