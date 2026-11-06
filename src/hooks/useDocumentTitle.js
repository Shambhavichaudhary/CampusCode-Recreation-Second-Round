import { useEffect } from 'react';

/** Sets the browser tab title for a page (each original HTML file had its own <title>). */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
