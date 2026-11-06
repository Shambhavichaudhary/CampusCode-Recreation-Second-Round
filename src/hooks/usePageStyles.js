import { useLayoutEffect } from 'react';

/**
 * usePageStyles
 * -------------
 * WHY THIS EXISTS
 * The original website was several separate HTML pages, each with its own CSS file.
 * Those files reuse the same class names (.hero, .header, .sidebar ...) and the same
 * :root variables with DIFFERENT values, and they style <html>/<body> directly.
 * In a React single-page app all pages live in one document, so if every stylesheet
 * were loaded at once they would overwrite each other and the design would change.
 *
 * WHAT IT DOES
 * While a component is on screen, this hook puts its CSS text into <style> tags in
 * <head>. When the component leaves the screen, the tags are removed again.
 * So every page sees exactly the CSS it had in the original website - nothing more.
 *
 * HOW TO USE
 *   import pageCss from '../styles/pages/landing.css?inline';   // "?inline" = give me the CSS as text
 *   usePageStyles([pageCss]);
 *
 * ORDER MATTERS: styles are added in the order of the array, later ones win ties.
 * (Login relies on this: it loads login.css first and the shared auth.css after it,
 * exactly like the original Login/index.html did.)
 *
 * useLayoutEffect (instead of useEffect) adds the CSS before the browser paints,
 * so there is no flash of unstyled content when you navigate.
 */
export default function usePageStyles(cssList) {
  useLayoutEffect(() => {
    const tags = cssList.map((css) => {
      const tag = document.createElement('style');
      tag.textContent = css;
      document.head.appendChild(tag);
      return tag;
    });
    // Cleanup: remove the tags when the component unmounts.
    return () => tags.forEach((tag) => tag.remove());
    // The CSS strings never change, so we only need to run this once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
