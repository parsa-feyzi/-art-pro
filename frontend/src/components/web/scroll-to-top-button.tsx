"use client";

import scrollToTopHandler from "@/src/lib/funcs/scrollToTop";
import { Activity, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Activity mode={isVisible ? "visible" : "hidden"}>
      <Button onClick={scrollToTopHandler} variant="outline" size="icon-lg" className="fixed dark:bg-background/70 dark:backdrop-blur-xl z-20 md:bottom-5 md:right-5 bottom-4 right-4">
        <ArrowUp />
      </Button>
    </Activity>
  );
}
