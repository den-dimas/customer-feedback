import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Feedback Dashboard | Outbound",
  description: "Share your experience with us.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="max-w-4xl flex flex-col items-center gap-12 z-10">
        <div className="space-y-6 animate-fade-in">
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter leading-none">
            <span className="text-primary">Your Voice</span>{" "}
            <span className="text-foreground block mt-2">Matters</span>
          </h1>

          <p className="font-sans text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We are listening. Help us shape the future of our services by
            sharing your honest feedback today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-slide-up">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="rounded-xl px-10 py-7 text-lg h-auto group"
            >
              Go to Dashboard
              <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
