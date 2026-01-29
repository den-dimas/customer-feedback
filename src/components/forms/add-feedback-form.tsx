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
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AddFeedbackInput, addFeedbackSchema } from "@/schemas/feedback";
import { addFeedback } from "@/actions/feedback";

export function AddFeedbackForm({
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
  } = useForm<AddFeedbackInput>({
    resolver: zodResolver(addFeedbackSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: AddFeedbackInput) => {
    startTransition(async () => {
      try {
        const result = await addFeedback(data);

        if (!result.success) {
          if (result.error) {
            setError("root", {
              type: "invalid",
              message: result.error,
            });
          } else {
            toast.error("An unexpected error occurred.");
          }
          return;
        }

        toast.success("Feedback created.");
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
          <h1 className="text-2xl font-bold">Add New Feedback</h1>
        </div>

        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            {...register("title")}
            id="title"
            type="text"
            placeholder="Feature A is not working"
            required
            disabled={isPending}
            onChange={() => clearErrors()}
          />

          {errors.title && <FieldError>{errors.title.message}</FieldError>}
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="description">Description</FieldLabel>
          </div>

          <Textarea
            {...register("description")}
            id="description"
            required
            disabled={isPending}
            onChange={() => clearErrors()}
            placeholder="Enter your description here..."
          />

          {errors.description && (
            <FieldError>{errors.description.message}</FieldError>
          )}
        </Field>

        <Field>
          <Button
            type="submit"
            className="w-full transition-all active:scale-95 disabled:pointer-events-none"
            disabled={isPending || !!errors.title || !!errors.description}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding your feedback...
              </>
            ) : (
              "Add Feedback"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
