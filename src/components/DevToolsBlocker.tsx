"use client";

import { useEffect } from "react";

export default function DevToolsBlocker() {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const modifier = event.ctrlKey || event.metaKey;
      const blockedShortcut =
        event.key === "F12" ||
        (modifier && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        (modifier && key === "u");

      if (blockedShortcut) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return null;
}