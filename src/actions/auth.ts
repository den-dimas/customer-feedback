"use server";

import { createClient } from "@/lib/supabase/server";
import {
  LoginInput,
  loginSchema,
  RegisterInput,
  registerSchema,
} from "@/schemas/auth";
import { Error, Success } from "@/types/response";
import { redirect } from "next/navigation";

export async function signUp(input: RegisterInput) {
  const register = registerSchema.safeParse(input);

  if (!register.success) {
    return Error({
      message: register.error.issues[0]?.message || "Validation failed",
    });
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: register.data.email,
    password: register.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_FE_DOMAIN}/auth/confirm`,
    },
  });

  if (error != null) {
    return Error({ message: error.message });
  }

  if (data.user?.identities?.length == 0) {
    return Error({ message: "Email already used" });
  }

  return Success(data);
}

export async function signIn(input: LoginInput) {
  const login = loginSchema.safeParse(input);

  if (!login.success) {
    return Error({
      message: login.error.issues[0]?.message || "Validation failed",
    });
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: login.data.email,
    password: login.data.password,
  });

  if (error != null) {
    return Error({ message: error.message });
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error != null) {
    return Error({ message: error.message });
  }

  return Success(null);
}
