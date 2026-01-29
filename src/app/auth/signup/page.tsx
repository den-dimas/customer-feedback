import Link from "next/link";
import { Sparkles } from "lucide-react";

import { SignupForm } from "@/components/forms/signup-form";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 animate-fade-in">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-3 font-medium group">
            <div className="bg-primary text-white flex size-10 items-center justify-center rounded-lg">
              <Sparkles className="size-5" />
            </div>
            <span className="text-xl font-heading font-bold">Outbound</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted border-l relative hidden lg:flex items-center justify-center">
        <div className="max-w-md text-center space-y-4 p-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/20 bg-background text-sm font-medium text-primary mb-4">
            <Sparkles className="size-4 text-accent" />
            <span>Join Us</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-foreground">
            Start Your Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            Create your account and be part of shaping better experiences
            together.
          </p>
        </div>
      </div>
    </div>
  );
}
