"use server";

import { createClient } from "@/lib/supabase/server";
import {
  LoginInput,
  loginSchema,
  RegisterInput,
  registerSchema,
} from "@/schemas/auth";
import { Error, Success } from "@/types/response";

export async function signUp(input: RegisterInput) {
  const register = registerSchema.safeParse(input);

  if (!register.success) {
    return Error(register.error);
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: register.data.email,
    password: register.data.password,
    options: {
      emailRedirectTo: "http://localhost:3000/dashboard",
    },
  });

  if (error != null) {
    return Error(error);
  }

  if (data.user?.identities?.length == 0) {
    return Error({ message: "Email already used" });
  }

  return Success(data);
}

export async function signIn(input: LoginInput) {
  const login = loginSchema.safeParse(input);

  if (!login.success) {
    return Error(login.error);
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: login.data.email,
    password: login.data.password,
  });

  if (error != null) {
    return Error(error);
  }

  return Success(data);
}
