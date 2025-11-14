import { useEffect, useState } from "react";
import { cn } from "./ui/utils";

export function WhatsAppFloatButton() {
  const phoneNumber = "9779705320350"; // +977-9705320350 without + and dashes
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "w-12 h-12 md:w-14 md:h-14",
        "rounded-full",
        "shadow-lg hover:shadow-xl",
        "hover:scale-110 active:scale-95",
        "outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2",
        "overflow-hidden",
        shouldAnimate ? "animate-bounce-in" : "opacity-0"
      )}
      aria-label="Contact us on WhatsApp"
      style={{ zIndex: 9999 }}
    >
      <img
        src="/whatsapp.png"
        alt="WhatsApp"
        className="w-full h-full object-contain rounded-full"
        loading="eager"
        draggable="false"
      />
      <span className="sr-only">Contact us on WhatsApp</span>
    </a>
  );
}

