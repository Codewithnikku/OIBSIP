/* PAGE LOADER */
window.addEventListener("load", () =>
  setTimeout(
    () => document.getElementById("page-loader").classList.add("hidden"),
    1900,
  ),
);

/* SCROLL PROGRESS */
const bar = document.getElementById("progress-bar");
window.addEventListener(
  "scroll",
  () => {
    bar.style.width =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100 +
      "%";
  },
  { passive: true },
);

/* NAV SCROLL */
const nav = document.getElementById("main-nav");
window.addEventListener(
  "scroll",
  () => nav.classList.toggle("scrolled", window.scrollY > 60),
  { passive: true },
);

/* PARTICLES */
const pc = document.getElementById("particles");
for (let i = 0; i < 20; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--dur:${6 + Math.random() * 9}s;--delay:${Math.random() * 5}s;--ty:${-40 - Math.random() * 80}px;--tx:${(Math.random() - 0.5) * 80}px`;
  pc.appendChild(p);
}

/* HERO PARALLAX */
const heroStars = document.querySelector(".hero-stars");
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY < window.innerHeight)
      heroStars.style.transform = `translateY(${window.scrollY * 0.28}px)`;
  },
  { passive: true },
);

/* REVEAL OBSERVER */
const ro = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        ro.unobserve(e.target);
      }
    });
  },
  { threshold: 0.13, rootMargin: "0px 0px -30px 0px" },
);
document.querySelectorAll(".reveal").forEach((el) => ro.observe(el));

/* TIMELINE LINE + ITEMS */
const tlt = document.getElementById("tlTrack");
new IntersectionObserver(
  ([e]) => {
    if (e.isIntersecting) tlt.classList.add("line-go");
  },
  { threshold: 0.08 },
).observe(tlt);
const tio = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        tio.unobserve(e.target);
      }
    });
  },
  { threshold: 0.25 },
);
document.querySelectorAll(".tl-item").forEach((el, i) => {
  el.style.transitionDelay = i * 0.12 + "s";
  tio.observe(el);
});

/* COUNT-UP */
const co = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const t = +e.target.dataset.target,
        step = Math.ceil(t / 40);
      let c = 0;
      const timer = setInterval(() => {
        c = Math.min(c + step, t);
        e.target.textContent = c;
        if (c >= t) clearInterval(timer);
      }, 40);
      co.unobserve(e.target);
    });
  },
  { threshold: 0.5 },
);
document
  .querySelectorAll(".stat-num[data-target]")
  .forEach((el) => co.observe(el));

/* IMAGE LOAD — remove shimmer */
document.querySelectorAll(".g-item img").forEach((img) => {
  const done = () => img.closest(".g-item").classList.add("loaded");
  if (img.complete && img.naturalWidth) done();
  else img.addEventListener("load", done);
});
