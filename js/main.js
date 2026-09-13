/* ============================================================
   Green Apple Holidays — interactions & dynamic rendering
   ============================================================ */
const WHATSAPP = "919947438291"; // primary number, intl format for wa.me
const PHONE_DISPLAY = "99474 38291";

document.addEventListener("DOMContentLoaded", () => {
  buildHeaderState();
  buildNavToggle();
  buildReveal();
  renderFleet();
  renderPackages();
  renderGallery();
  renderTestimonials();
  buildBooking();
  buildCounters();
  buildLightbox();
  setYear();
});

/* ---------- sticky header ---------- */
function buildHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- mobile nav ---------- */
function buildNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
    document.body.classList.toggle("nav-open");
  });
  links.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      document.body.classList.remove("nav-open");
    })
  );
}

/* ---------- scroll reveal ---------- */
function buildReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: .12 });
  els.forEach(e => io.observe(e));
}

/* ---------- animated counters ---------- */
function buildCounters() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;
  const run = (el) => {
    const target = +el.dataset.count;
    const dur = 1400; const t0 = performance.now();
    const suffix = el.dataset.suffix || "";
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: .5 });
  nums.forEach(n => io.observe(n));
}

/* ---------- fleet rendering + filter ---------- */
function fleetMedia(v) {
  if (v.photo) return `<div class="photo-slot" style="background-image:url('${v.photo}')"></div>`;
  return busSVG(v.body, v.glass, v.accent);
}
function fleetCardHTML(v) {
  return `<article class="fleet-card reveal" data-type="${v.type}">
    <div class="fleet-media" style="background:${v.body}0d">
      <span class="tag">Green Apple</span>
      <span class="seat">${v.seats}</span>
      ${fleetMedia(v)}
    </div>
    <div class="fleet-body">
      <h3>${v.name}</h3>
      <p class="sub">${v.sub}</p>
      <div class="spec-row">${v.specs.map(s => `<span class="spec">${s}</span>`).join("")}</div>
      <div class="fleet-foot">
        <div class="price">${v.price} <small>${v.unit}</small></div>
        <a class="btn btn-primary" href="contact.html?vehicle=${encodeURIComponent(v.name)}">Book now</a>
      </div>
    </div>
  </article>`;
}
function renderFleet() {
  const grid = document.querySelector("[data-fleet]");
  if (!grid) return;
  const limit = grid.dataset.fleet === "featured" ? 3 : FLEET.length;
  grid.innerHTML = FLEET.slice(0, limit).map(fleetCardHTML).join("");
  buildReveal();
  // filter chips
  const chips = document.querySelectorAll("[data-filter]");
  chips.forEach(chip => chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    grid.querySelectorAll(".fleet-card").forEach(card => {
      const show = f === "all" || card.dataset.type === f;
      card.style.display = show ? "" : "none";
    });
  }));
}

/* ---------- packages ---------- */
function renderPackages() {
  const grid = document.querySelector("[data-packages]");
  if (!grid) return;
  const limit = grid.dataset.packages === "featured" ? 3 : PACKAGES.length;
  grid.innerHTML = PACKAGES.slice(0, limit).map(p => {
    const bg = p.photo
      ? `background-image:url('${p.photo}');background-size:cover;background-position:center`
      : `background:${p.grad}`;
    return `<article class="pkg-card reveal">
      <div class="pkg-bg" style="${bg}"></div>
      <div class="pkg-body">
        <span class="eyebrow" style="background:rgba(255,255,255,.2);color:#fff">${p.tag}</span>
        <h3>${p.name}</h3>
        <div class="pkg-meta"><span>🗓 ${p.days}</span><span>🚌 Any vehicle</span></div>
        <div class="from">from ${p.from} <span style="font-weight:400;color:rgba(255,255,255,.8);font-size:.8rem">/ group</span></div>
        <a class="btn btn-ghost" style="margin-top:1rem" href="contact.html?package=${encodeURIComponent(p.name)}">Enquire</a>
      </div>
    </article>`;
  }).join("");
  buildReveal();
}

/* ---------- gallery ---------- */
function renderGallery() {
  const grid = document.querySelector("[data-gallery]");
  if (!grid) return;
  grid.innerHTML = GALLERY.map((g, i) => {
    const bg = g.photo
      ? `background-image:url('${g.photo}');background-size:cover;background-position:center`
      : `background:${g.grad}`;
    const inner = g.photo ? "" :
      `<div style="width:100%;height:100%;display:grid;place-items:center">
         <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="1.4">
           <rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 12h18M8 6v12M16 6v12"/>
           <circle cx="7" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>
       </div>`;
    return `<figure data-index="${i}">
      <div class="g-img" style="--ar:${g.ar};${bg}">${inner}</div>
      <figcaption>${g.cap}</figcaption>
    </figure>`;
  }).join("");
}

/* ---------- lightbox ---------- */
function buildLightbox() {
  const grid = document.querySelector("[data-gallery]");
  const lb = document.querySelector("[data-lightbox]");
  if (!grid || !lb) return;
  const stage = lb.querySelector(".lb-stage");
  const cap = lb.querySelector(".lb-cap");
  let idx = 0;
  const show = (i) => {
    idx = (i + GALLERY.length) % GALLERY.length;
    const g = GALLERY[idx];
    const bg = g.photo ? `background-image:url('${g.photo}');background-size:cover;background-position:center` : `background:${g.grad}`;
    stage.style.cssText = `aspect-ratio:${g.ar};${bg}`;
    cap.textContent = g.cap;
  };
  grid.addEventListener("click", (e) => {
    const fig = e.target.closest("figure");
    if (!fig) return;
    show(+fig.dataset.index); lb.classList.add("open");
  });
  lb.addEventListener("click", (e) => {
    if (e.target.dataset.close !== undefined) lb.classList.remove("open");
    if (e.target.dataset.dir) show(idx + (+e.target.dataset.dir));
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") lb.classList.remove("open");
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });
}

/* ---------- testimonials ---------- */
function renderTestimonials() {
  const track = document.querySelector("[data-testi]");
  if (!track) return;
  track.innerHTML = TESTIMONIALS.map(t => `
    <article class="testi">
      <div class="stars">★★★★★</div>
      <p>"${t.txt}"</p>
      <div class="who">
        <div class="av">${t.av}</div>
        <div><div class="nm">${t.nm}</div><div class="loc">${t.loc}</div></div>
      </div>
    </article>`).join("");
}

/* ---------- booking form + live estimate ---------- */
function buildBooking() {
  const form = document.querySelector("[data-booking]");
  if (!form) return;

  // prefill from query string
  const q = new URLSearchParams(location.search);
  const vSel = form.querySelector("[name=vehicle]");
  if (vSel) {
    FLEET.forEach(v => {
      const o = document.createElement("option");
      o.value = v.name; o.textContent = `${v.name} — ${v.seats}`;
      o.dataset.rate = v.price.replace(/[^\d.]/g, "");
      vSel.appendChild(o);
    });
    if (q.get("vehicle")) vSel.value = q.get("vehicle");
  }
  const pkg = q.get("package");
  const msg = form.querySelector("[name=message]");
  if (pkg && msg) msg.value = `I'm interested in the "${pkg}" package. Please share details.`;

  const estVal = form.querySelector("[data-estimate-val]");
  const kmInput = form.querySelector("[name=km]");
  const daysInput = form.querySelector("[name=days]");

  const recalc = () => {
    const opt = vSel?.selectedOptions[0];
    const rate = opt ? +opt.dataset.rate || 20 : 20;
    const km = +kmInput?.value || 0;
    const days = +daysInput?.value || 1;
    const driverBatta = 500 * days;
    const total = km * rate + driverBatta;
    if (estVal) estVal.textContent = total > 0 ? "₹" + total.toLocaleString() : "—";
  };
  [vSel, kmInput, daysInput].forEach(el => el && el.addEventListener("input", recalc));
  recalc();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    const text = encodeURIComponent(
      `*New Booking Enquiry — Green Apple Holidays*\n` +
      `Name: ${d.name || "-"}\nPhone: ${d.phone || "-"}\n` +
      `Vehicle: ${d.vehicle || "-"}\nTrip: ${d.pickup || "-"} → ${d.drop || "-"}\n` +
      `Date: ${d.date || "-"}\nDays: ${d.days || "-"} | Approx km: ${d.km || "-"}\n` +
      `Est. fare: ${estVal ? estVal.textContent : "-"}\nMessage: ${d.message || "-"}`
    );
    const ok = form.querySelector("[data-form-ok]");
    if (ok) { ok.hidden = false; ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
  });
}

/* ---------- misc ---------- */
function setYear() {
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
}
