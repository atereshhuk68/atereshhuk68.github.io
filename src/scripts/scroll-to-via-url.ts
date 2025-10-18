/**
 * Initializes the scroll-to-via-URL functionality.
 *
 * Checks for a 'scroll' query parameter in the current URL and scrolls to the
 * corresponding element if found. The scroll action is delayed by 400ms to ensure
 * the page is fully loaded. After scrolling, removes the 'scroll' parameter from
 * the URL without triggering a page reload.
 *
 * @remarks
 * - Uses smooth scrolling behavior
 * - Preserves other query parameters and hash fragments
 * - Updates browser history without adding a new entry
 *
 * @example
 * ```
 * https://example.com/page?scroll=section1
 * ```
 * @public
 */
export const scrollToViaUrl = (() => {
  return {
    init: () => {
      const params = new URLSearchParams(window.location.search);
      const scrollId = params.get("scroll");
      if (scrollId) {
        const el = document.getElementById(scrollId);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
            params.delete("scroll");
            const newUrl =
              window.location.pathname +
              (params.toString() ? `?${params.toString()}` : "") +
              window.location.hash;
            window.history.replaceState({}, "", newUrl);
          }, 400);
        }
      }
    },
  };
})();
