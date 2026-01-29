import { MessageSquare, Plus } from "lucide-react";
import { getFeedbacks } from "@/actions/feedback";
import { FeedbackCard } from "@/components/feedback-card";
import { AddFeedbackModal } from "@/components/add-feedback-modal";
import { Button } from "@/components/ui/button";

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
              <Button>
                <Plus className="w-4 h-4" />
                New Feedback
              </Button>
            </AddFeedbackModal>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-2">
            All Feedback
          </h2>
          <p className="text-muted-foreground">
            {feedbacks.success && feedbacks.data ? feedbacks.data.length : 0}{" "}
            total submissions
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {feedbacks.success && feedbacks.data && feedbacks.data.length > 0 ? (
            feedbacks.data.map((feedback) => (
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
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  <Plus className="w-4 h-4" />
                  Add Feedback
                </button>
              </AddFeedbackModal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
