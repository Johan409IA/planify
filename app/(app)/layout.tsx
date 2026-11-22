import { redirect } from "next/navigation";
import { type ReactNode, Suspense } from "react";
import { SignOutButton } from "@/components/app/sign-out-button";
import { getToken } from "@/lib/auth-server";

/**
 * Guardia de sesión para rutas privadas: sin token → /login.
 * El token es dato de runtime (cookies), envuelto en <Suspense> (Cache Components).
 */
async function ZonaPrivada({ children }: { children: ReactNode }) {
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <a href="/projects" className="font-semibold">
          Planify
        </a>
        <SignOutButton />
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<p className="p-6 text-sm">Cargando…</p>}>
      <ZonaPrivada>{children}</ZonaPrivada>
    </Suspense>
  );
}
