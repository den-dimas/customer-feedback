"use client";

import { MessageSquare, Plus } from "lucide-react";
import { AddFeedbackModal } from "./modals/add-feedback-modal";
import { FeedbackCard } from "./feedback-card";
import { getFeedbacks } from "@/actions/feedback";
import { useEffect, useRef, useState } from "react";
import { SelectFeedback } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/client";

export function FeedbackList({ data }: { data: SelectFeedback[] }) {
  const [feedbacks, setFeedbacks] = useState<SelectFeedback[]>(data);

  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    const query = async () => {
      try {
        const result = await getFeedbacks();

        if (result.success) {
          setFeedbacks(result.data || []);
          return;
        }

        setFeedbacks([]);
        return;
      } catch {}
    };

    const subscribe = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        supabase.realtime.setAuth(session.access_token);
      }

      const channel = supabase.channel("feedbacks", {
        config: { private: true },
      });

      channel.on("broadcast", { event: "INSERT" }, () => {
        query();
      });

      channel.on("broadcast", { event: "UPDATE" }, () => {
        query();
      });

      channel.subscribe();
      channelRef.current = channel;
    };

    subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [supabase]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-heading text-foreground mb-2">
          All Feedback
        </h2>
        <p className="text-muted-foreground">
          {feedbacks.length} total submissions
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id.toString()} feedback={feedback} />
          ))
        ) : (
          <div className="py-24 text-center border border-dashed border-border rounded-xl bg-muted/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <MessageSquare className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              No feedback yet
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Be the first to share your thoughts
            </p>
            <AddFeedbackModal>
              <button
                suppressHydrationWarning
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Feedback
              </button>
            </AddFeedbackModal>
          </div>
        )}
      </div>
    </div>
  );
}
