import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-xl font-semibold">Esta página no se encuentra</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No existe o no tienes acceso a ella.
      </p>
      <Link href="/" className="text-sm underline">
        Volver al inicio
      </Link>
    </main>
  );
}
