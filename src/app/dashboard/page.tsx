import { MessageSquare, Plus } from "lucide-react";
import { getFeedbacks } from "@/actions/feedback";
import { FeedbackCard } from "@/components/feedback-card";
import { AddFeedbackModal } from "@/components/modals/add-feedback-modal";
import { Button } from "@/components/ui/button";
import { FeedbackList } from "@/components/feedback-list";

export default async function Dashboard() {
  const feedbacks = await getFeedbacks();

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-heading text-foreground">
                  Outbound
                </h1>
                <p className="text-xs text-muted-foreground">
                  Customer Feedback
                </p>
              </div>
            </div>

            <AddFeedbackModal>
              <Button suppressHydrationWarning>
                <Plus className="w-4 h-4" />
                New Feedback
              </Button>
            </AddFeedbackModal>
          </div>
        </div>
      </div>

      <FeedbackList
        data={feedbacks.success && feedbacks.data ? feedbacks.data : []}
      />
    </div>
  );
}
