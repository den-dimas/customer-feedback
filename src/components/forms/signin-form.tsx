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
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
          if (result.error) {
            if (result.error.message == "Invalid login credentials") {
              setError("email", {
                type: "invalid",
                message: "Wrong email/password.",
              });
            }
          } else {
            toast.error(result.error || "An unexpected error occurred.");
          }
          return;
        }

        toast.success("Sign In Successfull!");
        router.push("/dashboard");
      } catch (error) {
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
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>

          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
            disabled={isPending}
            onChange={() => clearErrors()}
          />

          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
              tabIndex={-1}
            >
              Forgot your password?
            </a>
          </div>

          <PasswordWithEye
            {...register("password")}
            id="password"
            required
            autoComplete="password"
            disabled={isPending}
            onChange={() => clearErrors()}
          />

          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        <Field>
          <Button
            type="submit"
            className="w-full transition-all active:scale-95 disabled:pointer-events-none"
            disabled={isPending || !!errors.email || !!errors.password}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signin In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Field>

        <FieldSeparator></FieldSeparator>

        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/auth/signup" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
