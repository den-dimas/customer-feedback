import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle, Sparkles } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function ConfirmPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 animate-fade-in">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-3 font-medium group">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg border-2 border-primary">
              <Sparkles className="size-5" />
            </div>
            <span className="text-xl font-heading font-bold">Outbound</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
            <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle className="size-12" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold font-heading">
                Account Activated
              </h1>
              <p className="text-muted-foreground">
                Thank you for verifying your email. Your account is now active
                and ready to use.
              </p>
            </div>

            <Button asChild className="w-full" size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>

            <p className="text-xs text-muted-foreground">
              You can now access all features of the platform.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-muted border-l relative hidden lg:flex items-center justify-center">
        <div className="max-w-md text-center space-y-4 p-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/20 bg-background text-sm font-medium text-primary mb-4">
            <Sparkles className="size-4 text-accent" />
            <span>Success</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-foreground">
            You&apos;re All Set!
          </h2>
          <p className="text-lg text-muted-foreground">
            Welcome to the community. We&apos;re excited to have you on board.
          </p>
        </div>
      </div>
    </div>
  );
}
