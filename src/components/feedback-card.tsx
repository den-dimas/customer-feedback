"use client";

import { SelectFeedback } from "@/lib/db/schema";
import { Bug, Sparkles, CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

export function FeedbackCard({ feedback }: { feedback: SelectFeedback }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed":
        return "text-accent border-accent bg-accent/5";
      case "Pending":
        return "text-primary border-primary bg-primary/5";
      default:
        return "text-muted-foreground border-border bg-muted/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="group p-5 bg-white border border-border rounded-lg card-hover"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-foreground">{feedback.title}</h3>

            <span className="w-1 h-1 bg-border rounded-full"></span>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-lg ${getStatusColor(feedback.status || "")}`}
            >
              {feedback.status === "Processed" ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Circle className="w-3.5 h-3.5" />
              )}
              <span>{feedback.status}</span>
            </span>

            <span className="w-1 h-1 bg-border rounded-full"></span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border rounded-lg bg-muted/20">
              {feedback.category === "Bug" ? (
                <Bug className="w-3.5 h-3.5" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span className="capitalize">{feedback.category}</span>
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {feedback.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
