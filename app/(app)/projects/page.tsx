import Link from "next/link";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { fetchAuthQuery } from "@/lib/auth-server";

const ETIQUETAS_ESTADO: Record<string, string> = {
  draft: "Borrador",
  in_review: "En revisión",
  ready: "Preparado",
  archived: "Archivado",
};

async function ListaProyectos() {
  const proyectos = await fetchAuthQuery(api.projects.listMine, {});

  if (proyectos.length === 0) {
    return (
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Aún no tienes proyectos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Crea tu primer proyecto desde la plantilla base para empezar a
            planificar.
          </p>
          <Link href="/projects/new" className="mt-4 inline-block">
            <Button>Crear proyecto</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <ul className="flex w-full max-w-xl flex-col gap-3">
      {proyectos.map((proyecto) => (
        <li key={proyecto._id}>
          <Link href={`/projects/${proyecto._id}`} className="block">
            <Card className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{proyecto.name}</CardTitle>
                <Badge variant="secondary">
                  {ETIQUETAS_ESTADO[proyecto.status] ?? proyecto.status}
                </Badge>
              </CardHeader>
              {proyecto.description && (
                <CardContent className="text-sm text-zinc-600 dark:text-zinc-400">
                  {proyecto.description}
                </CardContent>
              )}
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex w-full max-w-xl items-center justify-between">
        <h1 className="text-xl font-semibold">Mis proyectos</h1>
        <Link href="/projects/new">
          <Button size="sm">Nuevo proyecto</Button>
        </Link>
      </div>
      <Suspense fallback={<p className="text-sm">Cargando proyectos…</p>}>
        <ListaProyectos />
      </Suspense>
    </div>
  );
}
