import { SelectFeedback } from "@/lib/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LucideAlertTriangle,
  LucideBug,
  LucideClock3,
  LucideLayoutPanelLeft,
} from "lucide-react";

export function FeedbackCard({ feedback }: { feedback: SelectFeedback }) {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>{feedback.title}</CardTitle>

        <CardDescription className="flex flex-col gap-2">
          <p className="flex">
            <LucideClock3 />:{" "}
            {feedback.createdAt.getUTCMinutes().toLocaleString()}
          </p>

          <p className="flex">
            <LucideLayoutPanelLeft />: {feedback.status}
          </p>

          <p className="flex">
            <LucideAlertTriangle />: {feedback.priority}
          </p>

          <p className="flex">
            <LucideBug />: {feedback.category}
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>{feedback.description}</p>
      </CardContent>
    </Card>
  );
}
