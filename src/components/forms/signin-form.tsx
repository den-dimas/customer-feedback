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
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/actions/auth";
import { toast } from "sonner";
import { PasswordWithEye } from "../inputs/password-with-eye";
import { Loader2 } from "lucide-react";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      try {
        const result = await signIn(data);

        if (!result.success) {
          if (result.error?.message === "Invalid login credentials") {
            setError("email", {
              type: "invalid",
              message: "Wrong email/password.",
            });
          } else {
            toast.error(
              result.error?.message || "An unexpected error occurred.",
            );
          }
          return;
        }

        toast.success("Sign In Successful!");
      } catch {
        // toast.error("Something went wrong. Please try again.");
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
            Welcome Back
          </h1>

          <p className="text-muted-foreground text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email" className="text-sm font-medium">
            Email
          </FieldLabel>
          <Input
            {...register("email", {
              onChange: () => clearErrors(),
            })}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
            disabled={isPending}
            className="mt-1.5"
          />

          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password" className="text-sm font-medium">
              Password
            </FieldLabel>
            {/* <a
              href="#"
              className="text-xs text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
              tabIndex={-1}
            >
              Forgot password?
            </a> */}
          </div>

          <PasswordWithEye
            {...register("password", {
              onChange: () => clearErrors(),
            })}
            id="password"
            required
            autoComplete="password"
            disabled={isPending}
            className="mt-1.5"
          />

          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        <Field className="mt-2">
          <Button
            type="submit"
            className="w-full h-11 rounded-xl font-medium"
            disabled={isPending || !!errors.email || !!errors.password}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Field>

        <FieldSeparator></FieldSeparator>

        <Field>
          <FieldDescription className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/signup"
              className="text-primary font-medium hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
            >
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
