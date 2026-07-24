import Link from "next/link";
import { login } from "../auth/actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; created?: string }> }) {
  const params = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <form action={login} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <Link href="/" className="text-2xl font-black">Reff</Link>
        <h1 className="mt-8 text-3xl font-bold">Entrar</h1>
        {params.created && <p className="mt-4 rounded-xl bg-emerald-500/15 p-3 text-sm text-emerald-300">Conta criada. Confira seu e-mail antes de entrar.</p>}
        {params.error && <p className="mt-4 rounded-xl bg-red-500/15 p-3 text-sm text-red-300">{params.error}</p>}
        <label className="mt-6 block text-sm text-zinc-300">E-mail<input name="email" type="email" required className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none focus:border-violet-400" /></label>
        <label className="mt-4 block text-sm text-zinc-300">Senha<input name="password" type="password" required minLength={8} className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 outline-none focus:border-violet-400" /></label>
        <button className="mt-6 w-full rounded-xl bg-violet-500 px-4 py-3 font-bold hover:bg-violet-400">Entrar</button>
        <p className="mt-6 text-center text-sm text-zinc-400">Ainda não tem conta? <Link className="text-violet-300" href="/register">Cadastre-se</Link></p>
      </form>
    </main>
  );
}
