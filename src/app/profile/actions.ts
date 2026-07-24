"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const interestsAllowed = [
  "Arte",
  "Escrita",
  "Games",
  "RP",
  "Livros",
  "Programação",
  "Música",
  "Anime",
  "LGBTQIA+",
  "Criadores independentes",
];

export async function saveProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const displayName = String(formData.get("displayName") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const pronouns = String(formData.get("pronouns") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();
  const themeColor = String(formData.get("themeColor") ?? "#8b5cf6");
  const interests = formData
    .getAll("interests")
    .map(String)
    .filter((item) => interestsAllowed.includes(item));

  if (displayName.length < 2 || displayName.length > 60) {
    redirect("/onboarding?error=Nome%20inválido");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName,
      bio: bio || null,
      pronouns: pronouns || null,
      location: location || null,
      website: website || null,
      theme_color: /^#[0-9a-fA-F]{6}$/.test(themeColor) ? themeColor : "#8b5cf6",
      interests,
      onboarding_completed: true,
    })
    .eq("id", user.id);

  if (error) redirect(`/onboarding?error=${encodeURIComponent(error.message)}`);
  redirect("/home");
}
