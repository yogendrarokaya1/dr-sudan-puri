"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <span className="text-4xl">⚠️</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-ink">
            Something Went Wrong
          </h1>
          <p className="text-muted">{error.message}</p>
        </div>
        <Button variant="primary" size="lg" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}