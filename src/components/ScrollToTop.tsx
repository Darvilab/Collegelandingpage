import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "./ui/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState('88px');

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const updateBottomOffset = () => {
      setBottomOffset(window.innerWidth >= 768 ? '96px' : '88px');
    };

    // Check initial scroll position
    toggleVisibility();
    updateBottomOffset();

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", updateBottomOffset);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", updateBottomOffset);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed right-6 z-50",
        "flex items-center justify-center",
        "w-12 h-12 md:w-14 md:h-14",
        "bg-gradient-to-br from-blue-500 to-cyan-500",
        "text-white",
        "rounded-full",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300 ease-out",
        "hover:scale-110 active:scale-95",
        "backdrop-blur-sm",
        "border border-white/20",
        "outline-none",
        "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="Scroll to top"
      style={{ zIndex: 9998, bottom: bottomOffset }}
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
}

