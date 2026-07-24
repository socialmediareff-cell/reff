import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { saveProfile } from "../profile/actions";

const interests = ["Arte", "Escrita", "Games", "RP", "Livros", "Programação", "Música", "Anime", "LGBTQIA+", "Criadores independentes"];

export default async function OnboardingPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio, pronouns, location, website, theme_color, interests")
    .eq("id", user.id)
    .maybeSingle();

  const selectedInterests = Array.isArray(profile?.interests) ? profile.interests : [];

  return (
    <main className="min-h-screen px-6 py-10">
      <form action={saveProfile} className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm font-semibold text-violet-300">Seu espaço começa aqui</p>
        <h1 className="mt-2 text-4xl font-black">Monte seu perfil</h1>
        <p className="mt-3 text-zinc-400">Escolha como você quer aparecer e o que gosta.</p>

        {params.error && <p className="mt-5 rounded-xl bg-red-500/15 p-3 text-red-300">{params.error}</p>}

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="text-sm text-zinc-300">Nome exibido<input name="displayName" required minLength={2} maxLength={60} defaultValue={profile?.display_name ?? ""} className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none focus:border-violet-400" /></label>
          <label className="text-sm text-zinc-300">Pronomes<input name="pronouns" maxLength={40} defaultValue={profile?.pronouns ?? ""} className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none focus:border-violet-400" /></label>
          <label className="text-sm text-zinc-300">Localização<input name="location" maxLength={80} defaultValue={profile?.location ?? ""} className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none focus:border-violet-400" /></label>
          <label className="text-sm text-zinc-300">Site<input name="website" type="url" maxLength={200} defaultValue={profile?.website ?? ""} className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none focus:border-violet-400" /></label>
        </div>

        <label className="mt-5 block text-sm text-zinc-300">Biografia<textarea name="bio" maxLength={500} rows={5} defaultValue={profile?.bio ?? ""} className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none focus:border-violet-400" /></label>

        <div className="mt-6">
          <p className="text-sm text-zinc-300">Interesses</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {interests.map((interest) => (
              <label key={interest} className="cursor-pointer rounded-full border border-white/10 px-3 py-2 text-sm has-[:checked]:border-violet-400 has-[:checked]:bg-violet-500/20">
                <input className="sr-only" type="checkbox" name="interests" value={interest} defaultChecked={selectedInterests.includes(interest)} />
                {interest}
              </label>
            ))}
          </div>
        </div>

        <label className="mt-6 flex items-center gap-3 text-sm text-zinc-300">Cor do perfil<input name="themeColor" type="color" defaultValue={profile?.theme_color ?? "#8b5cf6"} className="h-10 w-14 rounded border-0 bg-transparent" /></label>

        <button className="mt-8 w-full rounded-xl bg-violet-500 px-5 py-3 font-bold hover:bg-violet-400">Salvar perfil</button>
      </form>
    </main>
  );
}
