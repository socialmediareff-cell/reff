import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#312e81_0,#09090b_45%)] px-6 py-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <span className="text-2xl font-black">Reff</span>
        <div className="flex gap-3">
          <Link className="rounded-xl px-4 py-2 text-zinc-300 hover:bg-white/10" href="/login">Entrar</Link>
          <Link className="rounded-xl bg-violet-500 px-4 py-2 font-bold hover:bg-violet-400" href="/register">Criar conta</Link>
        </div>
      </nav>
      <section className="mx-auto grid min-h-[78vh] max-w-6xl items-center gap-12 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-4 font-semibold text-violet-300">Crie. Converse. Pertença.</p>
          <h1 className="text-5xl font-black leading-tight sm:text-7xl">Seu espaço para encontrar pessoas e comunidades.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">Uma rede social para artistas, escritores, gamers, leitores, pessoas tímidas, comunidades LGBTQIA+, jogadores de RP e criadores independentes.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="rounded-2xl bg-violet-500 px-6 py-3 font-bold hover:bg-violet-400" href="/register">Começar agora</Link>
            <Link className="rounded-2xl border border-white/15 px-6 py-3 font-bold hover:bg-white/10" href="/login">Já tenho conta</Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="rounded-2xl bg-zinc-900 p-5">
            <p className="text-sm text-violet-300">Comunidade em destaque</p>
            <h2 className="mt-2 text-2xl font-bold">Criadores independentes</h2>
            <p className="mt-3 text-zinc-400">Compartilhe projetos, encontre colaboradores e acompanhe o trabalho de pessoas criativas.</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {['Posts e feed','Perfis decoráveis','Comunidades','Chat em tempo real'].map((item) => <div key={item} className="rounded-2xl border border-white/10 p-4 text-sm text-zinc-300">{item}</div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
