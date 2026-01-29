"use server";

import { createClient } from "@/lib/supabase/server";
import { AddFeedbackInput, addFeedbackSchema } from "@/schemas/feedback";
import {
  createFeedback,
  getFeedbacksByUserId,
} from "@/services/feedback-service";
import { Error, Success } from "@/types/response";

export async function addFeedback(input: AddFeedbackInput) {
  const feedback = addFeedbackSchema.safeParse(input);

  if (!feedback.success) {
    return Error(feedback.error);
  }

  const supabase = await createClient();
  const auth = await supabase.auth.getUser();

  if (auth.error != null) {
    return Error(auth.error);
  }

  try {
    const result = await createFeedback({
      title: feedback.data.title,
      description: feedback.data.description,
      user_id: auth.data.user.id,
    });

    return Success(result[0]);
  } catch (error) {
    return Error(error);
  }
}

export async function getFeedbacks() {
  const supabase = await createClient();

  const auth = await supabase.auth.getUser();

  if (auth.error != null) {
    return Error(auth.error);
  }

  try {
    const result = await getFeedbacksByUserId(auth.data.user.id);

    return Success(result);
  } catch (error) {
    return Error(error);
  }
}
