/**
 * Image reveal via clip-path: https://emilkowal.ski/ui/the-magic-of-clip-path
 * Reveals `.clip-reveal` elements inside `containerSelector` when scrolled
 * into view. `staggerMs` delays each element within the same observer batch,
 * so simultaneously visible images reveal one after another.
 */
export function initClipReveal(containerSelector: string, staggerMs = 0) {
  const items = document.querySelectorAll<HTMLElement>(
    `${containerSelector} .clip-reveal`,
  );
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, index) => {
          const el = entry.target as HTMLElement;
          el.style.animationDelay = `${index * staggerMs}ms`;
          el.classList.add("is-revealed");
          observer.unobserve(el);
        });
    },
    { rootMargin: "-100px" },
  );

  items.forEach((item) => observer.observe(item));
}
