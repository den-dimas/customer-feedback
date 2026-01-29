"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoadingSpinner({
  size = "default",
}: {
  size?: "sm" | "default" | "lg";
}) {
  const sizeClasses = {
    sm: "size-4",
    default: "size-6",
    lg: "size-8",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center"
    >
      <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
    </motion.div>
  );
}

export function LoadingCard() {
  return (
    <div className="bento-card p-6 animate-pulse">
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded-lg w-3/4"></div>
        <div className="h-4 bg-muted rounded-lg w-full"></div>
        <div className="h-4 bg-muted rounded-lg w-5/6"></div>
        <div className="h-4 bg-muted rounded-lg w-4/6"></div>
      </div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
