"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function authErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("only request this after")) {
    const seconds = message.match(/after\s+(\d+)\s+seconds?/i)?.[1];
    return seconds
      ? `Aguarde ${seconds} segundos antes de tentar novamente.`
      : "Aguarde alguns segundos antes de tentar novamente.";
  }

  if (normalized.includes("user already registered")) {
    return "Este e-mail já está cadastrado.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Confirme seu e-mail antes de entrar.";
  }

  if (normalized.includes("password should be")) {
    return "A senha não atende aos requisitos mínimos de segurança.";
  }

  return "Não foi possível concluir a operação. Tente novamente.";
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(authErrorMessage(error.message))}`);
  }

  redirect("/home");
}

export async function register(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const displayName = String(formData.get("displayName") ?? "").trim();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username, display_name: displayName || username } },
  });

  if (error) {
    redirect(`/register?error=${encodeURIComponent(authErrorMessage(error.message))}`);
  }

  redirect("/login?created=1");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
