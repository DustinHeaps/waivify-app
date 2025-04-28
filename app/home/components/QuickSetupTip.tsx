"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

export const QuickSetupTip = () => {
  const [dismissed, setDismissed] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const storedDismissed = localStorage.getItem("waivify-setup-tip-dismissed");
    if (storedDismissed === "true") {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setFadeOut(true);
    setTimeout(() => {
      setDismissed(true);
      localStorage.setItem("waivify-setup-tip-dismissed", "true");
    }, 300); // matches the fade transition time
  };

  if (dismissed) return null;

  return (
    <Alert
      className={`flex items-center justify-between mb-4 transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center space-x-2">
        <Info className="h-4 w-4 text-muted-foreground" />
        <AlertDescription className="text-sm">
          Tip: Share your link by text, email, or QR code to start collecting signatures instantly.
        </AlertDescription>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="h-6 px-2 text-xs"
        onClick={handleDismiss}
      >
        Got it
      </Button>
    </Alert>
  );
};
