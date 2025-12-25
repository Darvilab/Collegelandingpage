import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTopOnRouteChange() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If a hash is present, scroll to that element after navigation renders.
    if (hash) {
      const id = hash.replace("#", "");
      window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 0);
      return;
    }

    // Otherwise scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use instant for immediate scroll, or "smooth" for animated scroll
    });
  }, [pathname, hash]);

  return null;
}


