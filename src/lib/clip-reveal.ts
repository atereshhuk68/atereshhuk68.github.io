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

  let revealedCount = 0;

  function reveal(el: HTMLElement) {
    if (el.classList.contains("is-revealed")) return;
    el.style.animationDelay = `${revealedCount * staggerMs}ms`;
    el.classList.add("is-revealed");
    revealedCount++;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "-100px" },
  );

  for (const item of items) {
    const rect = item.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      reveal(item);
    } else {
      observer.observe(item);
    }
  }
}
