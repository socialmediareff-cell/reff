import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../auth/actions";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, bio")
    .eq("id", user.id)
    .single();

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <span className="text-2xl font-black">Reff</span>
          <form action={logout}><button className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/10">Sair</button></form>
        </header>
        <section className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="grid size-20 place-items-center rounded-full bg-violet-500 text-3xl font-black">{(profile?.display_name || profile?.username || "R")[0].toUpperCase()}</div>
            <h1 className="mt-4 text-2xl font-bold">{profile?.display_name || profile?.username}</h1>
            <p className="text-zinc-400">@{profile?.username}</p>
            <p className="mt-4 text-sm text-zinc-300">{profile?.bio || "Seu perfil está pronto para ser personalizado."}</p>
          </aside>
          <section className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-bold">Bem-vindo à Reff</h2>
              <p className="mt-2 text-zinc-400">A fundação está funcionando: autenticação, perfil automático e sessão protegida.</p>
            </div>
            <div className="rounded-3xl border border-dashed border-white/15 p-8 text-center text-zinc-400">O feed será construído na próxima etapa.</div>
          </section>
        </section>
      </div>
    </main>
  );
}
