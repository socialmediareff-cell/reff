import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../auth/actions";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username, display_name, bio, pronouns, location, website, theme_color, interests, onboarding_completed")
    .eq("id", user.id)
    .maybeSingle();

  if (error) redirect(`/onboarding?error=${encodeURIComponent("Não foi possível carregar seu perfil.")}`);
  if (!profile || !profile.onboarding_completed) redirect("/onboarding");

  const themeColor = profile.theme_color || "#8b5cf6";
  const interests = Array.isArray(profile.interests) ? profile.interests : [];
  const displayName = profile.display_name || profile.username || "Usuário";

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <span className="text-2xl font-black">Reff</span>
          <div className="flex items-center gap-3">
            <Link href="/onboarding" className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/10">Editar perfil</Link>
            <form action={logout}><button className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/10">Sair</button></form>
          </div>
        </header>
        <section className="mt-10 grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="h-24" style={{ backgroundColor: themeColor }} />
            <div className="p-6">
              <div className="-mt-16 grid size-24 place-items-center rounded-full border-4 border-zinc-950 text-3xl font-black" style={{ backgroundColor: themeColor }}>
                {displayName[0].toUpperCase()}
              </div>
              <h1 className="mt-4 text-2xl font-bold">{displayName}</h1>
              <p className="text-zinc-400">@{profile.username}{profile.pronouns ? ` · ${profile.pronouns}` : ""}</p>
              <p className="mt-4 text-sm leading-6 text-zinc-300">{profile.bio || "Sem biografia."}</p>
              {profile.location && <p className="mt-4 text-sm text-zinc-400">📍 {profile.location}</p>}
              {profile.website && <a href={profile.website} target="_blank" rel="noreferrer" className="mt-2 block truncate text-sm text-violet-300">{profile.website}</a>}
              <div className="mt-5 flex flex-wrap gap-2">
                {interests.map((interest: string) => <span key={interest} className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300">{interest}</span>)}
              </div>
            </div>
          </aside>
          <section className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold">Perfil concluído</h2>
              <p className="mt-2 text-zinc-400">Sua identidade básica na Reff está pronta.</p>
            </div>
            <div className="rounded-3xl border border-dashed border-white/15 p-8 text-center text-zinc-400">Próxima etapa: criar e visualizar posts no feed.</div>
          </section>
        </section>
      </div>
    </main>
  );
}
