"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { RegisterInput, registerSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { signUp } from "@/actions/auth";
import { PasswordWithEye } from "@/components/inputs/password-with-eye";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (data: RegisterInput) => {
    startTransition(async () => {
      try {
        const result = await signUp(data);

        if (!result.success) {
          if (result.error) {
            if (result.error.message.toLowerCase().includes("password")) {
              setError("password", {
                type: "server",
                message: result.error.message,
              });
              setError("passwordConfirmation", {
                type: "server",
                message: result.error.message,
              });
            } else {
              setError("email", {
                type: "invalid",
                message: result.error.message,
              });
            }
          } else {
            toast.error(result.error || "An unexpected error occurred.");
          }
          return;
        }

        toast.success(
          "We've sent you a confirmation email, please check your inbox.",
        );
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col gap-2 text-center mb-2">
          <h1 className="text-3xl font-bold font-heading tracking-tight">
            Create Account
          </h1>
          <p className="text-muted-foreground text-sm">
            Join us and start sharing your feedback
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email" className="text-sm font-medium">
            Email
          </FieldLabel>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
            disabled={isPending}
            className="mt-1.5"
          />

          {!errors.email ? (
            <FieldDescription className="text-xs">
              We&apos;ll use this to contact you. We will not share your email
              with anyone else.
            </FieldDescription>
          ) : (
            <FieldError>{errors.email.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="password" className="text-sm font-medium">
            Password
          </FieldLabel>

          <PasswordWithEye
            {...register("password")}
            id="password"
            required
            autoComplete="new-password"
            disabled={isPending}
            className="mt-1.5"
          />

          {!errors.password ? (
            <FieldDescription className="text-xs">
              Must be at least 8 characters long.
            </FieldDescription>
          ) : (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel
            htmlFor="confirm-password"
            className="text-sm font-medium"
          >
            Confirm Password
          </FieldLabel>

          <PasswordWithEye
            {...register("passwordConfirmation")}
            id="confirm-password"
            required
            autoComplete="new-password"
            disabled={isPending}
            className="mt-1.5"
          />

          {!errors.passwordConfirmation ? (
            <FieldDescription className="text-xs">
              Please confirm your password.
            </FieldDescription>
          ) : (
            <FieldError>{errors.passwordConfirmation.message}</FieldError>
          )}
        </Field>

        <Field className="mt-2">
          <Button
            type="submit"
            className="w-full h-11 rounded-xl font-medium"
            disabled={
              isPending ||
              !!errors.email ||
              !!errors.password ||
              !!errors.passwordConfirmation
            }
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </Field>

        <FieldSeparator></FieldSeparator>

        <Field>
          <FieldDescription className="text-center text-sm">
            Already have an account?{" "}
            <a
              href="/auth/signin"
              className="text-primary font-medium hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
            >
              Sign in
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
