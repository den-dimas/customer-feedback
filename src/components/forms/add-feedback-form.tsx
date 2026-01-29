"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
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
  onSuccess,
  ...props
}: React.ComponentProps<"form"> & { onSuccess?: () => void }) {
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
              message:
                typeof result.error === "string"
                  ? result.error
                  : JSON.stringify(result.error),
            });
          } else {
            toast.error("An unexpected error occurred.");
          }
          return;
        }

        toast.success("Feedback created.");
        if (onSuccess) onSuccess();
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <form
      className={cn("flex flex-col gap-5", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title" className="text-sm font-medium">
            Title
          </FieldLabel>
          <Input
            {...register("title")}
            id="title"
            type="text"
            placeholder="Feature A is not working"
            required
            disabled={isPending}
            onChange={() => clearErrors()}
            className="mt-1.5"
          />

          {errors.title && <FieldError>{errors.title.message}</FieldError>}
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="description" className="text-sm font-medium">
              Description
            </FieldLabel>
          </div>

          <Textarea
            {...register("description")}
            id="description"
            required
            disabled={isPending}
            onChange={() => clearErrors()}
            placeholder="Enter your description here..."
            className="mt-1.5"
          />

          {errors.description && (
            <FieldError>{errors.description.message}</FieldError>
          )}
        </Field>

        <Field className="mt-2">
          <Button
            type="submit"
            className="w-full transition-all active:scale-95 disabled:pointer-events-none h-11 rounded-xl font-medium"
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
