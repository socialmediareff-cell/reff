"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="text-3xl font-bold">Algo deu errado</h1>
        <p className="mt-3 text-zinc-400">Tente carregar a página novamente.</p>
        <button onClick={reset} className="mt-6 rounded-xl bg-violet-500 px-5 py-3 font-bold hover:bg-violet-400">Tentar novamente</button>
      </div>
    </main>
  );
}
