// hooks/usePageBlock.js
import { useEffect, useState } from "react";

export const usePageBlock = () => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // Disable Right Click
    const disableRightClick = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    // Prevent PrintScreen Key
    const disablePrintScreen = (event) => {
      if (event.key === "PrintScreen") {
        navigator.clipboard.writeText(""); // Clear clipboard
        setIsBlocked(true); // Turn the page black
        setTimeout(() => setIsBlocked(false), 1000); // Remove blackout after 1 second
      }
    };
    document.addEventListener("keyup", disablePrintScreen);

    // Block Other Screenshot Attempts
    const disableScreenCapture = (event) => {
      if (
        (event.ctrlKey && event.key === "p") || // Ctrl + P (Print)
        (event.ctrlKey && event.shiftKey && event.key === "s") || // Ctrl + Shift + S (Snipping Tool)
        (event.metaKey && event.key === "s") // Cmd + S (Mac)
      ) {
        event.preventDefault();
        setIsBlocked(true); // Turn the page black
        setTimeout(() => setIsBlocked(false), 1000); // Remove blackout after 1 second
      }
    };
    document.addEventListener("keydown", disableScreenCapture);

    // Detect When User Leaves or Returns to the Page
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlocked(true); // Turn the page black when user leaves
        setTimeout(() => setIsBlocked(false), 1000); // Remove blackout after 1 second
      } else {
        setIsBlocked(false); // Remove blackout when user returns
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Detect DevTools Open/Close
    const detectDevTools = () => {
      const devtools = /./;
      devtools.toString = function () {
        this.opened = true;
      };

      setInterval(() => {
        if (devtools.opened) {
          // When DevTools is opened
          setIsBlocked(true); // Turn the page black
          setTimeout(() => setIsBlocked(false), 1000); // Remove blackout after 1 second
        }
      }, 1000);
    };
    detectDevTools();

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keyup", disablePrintScreen);
      document.removeEventListener("keydown", disableScreenCapture);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isBlocked;
};
