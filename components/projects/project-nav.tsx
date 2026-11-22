"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { SectionKey } from "@/convex/projectTemplate";
import { SECCIONES } from "@/lib/sections";
import { cn } from "@/lib/utils";

export interface SectionEstado {
  sectionKey: SectionKey;
  isEnabled: boolean;
}

export function ProjectNav({
  projectId,
  sections,
}: {
  projectId: string;
  sections: SectionEstado[];
}) {
  const pathname = usePathname();
  const estado = new Map(sections.map((s) => [s.sectionKey, s]));

  return (
    <nav
      className="flex flex-wrap items-center gap-1"
      aria-label="Secciones del proyecto"
    >
      {SECCIONES.map((seccion, indice) => {
        const href = `/projects/${projectId}/${seccion.key}`;
        const activa = pathname === href;
        const habilitada = estado.get(seccion.key)?.isEnabled ?? true;
        return (
          <Link
            key={seccion.key}
            href={href}
            aria-current={activa ? "page" : undefined}
            className={cn(
              "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm",
              activa
                ? "bg-foreground font-medium text-background"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              !habilitada && "text-zinc-400",
            )}
          >
            {indice + 1}. {seccion.label}
            {!habilitada && (
              <Badge variant="outline" className="px-1 py-0 text-[10px]">
                omitida
              </Badge>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
