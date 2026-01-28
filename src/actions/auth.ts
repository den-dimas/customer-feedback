"use server";

import { createClient } from "@/lib/supabase/server";
import { RegisterInput, registerSchema } from "@/schemas/auth";
import z from "zod";

export async function signUp(input: RegisterInput) {
  const register = registerSchema.safeParse(input);

  if (!register.success) {
    return { success: false, error: z.treeifyError(register.error) };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: register.data.email,
    password: register.data.password,
    options: {
      emailRedirectTo: "http://localhost:3000/dashboard",
    },
  });

  return { data, error };
}
