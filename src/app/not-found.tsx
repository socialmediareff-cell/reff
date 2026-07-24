import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-violet-300">404</p>
        <h1 className="mt-2 text-4xl font-black">Página não encontrada</h1>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-violet-500 px-5 py-3 font-bold hover:bg-violet-400">Voltar ao início</Link>
      </div>
    </main>
  );
}
