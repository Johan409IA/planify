"use client";

import { useState } from "react";
import { toggleSection } from "@/app/actions/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SectionKey } from "@/convex/projectTemplate";
import { mensajeDeError } from "@/lib/mensajes-error";
import { labelDeSeccion } from "@/lib/sections";

export interface SectionTogglesProps {
  projectId: string;
  sections: {
    sectionKey: SectionKey;
    isEnabled: boolean;
    isRequired: boolean;
  }[];
}

export function SectionToggles({ projectId, sections }: SectionTogglesProps) {
  const [estado, setEstado] = useState(sections);
  const [error, setError] = useState<string | null>(null);
  const [pendiente, setPendiente] = useState<SectionKey | null>(null);

  async function alternar(sectionKey: SectionKey, isEnabled: boolean) {
    setPendiente(sectionKey);
    setError(null);
    const resultado = await toggleSection({ projectId, sectionKey, isEnabled });
    setPendiente(null);
    if (!resultado.ok) {
      setError(mensajeDeError(new Error(resultado.error)));
      return;
    }
    setEstado((previo) =>
      previo.map((seccion) =>
        seccion.sectionKey === sectionKey ? { ...seccion, isEnabled } : seccion,
      ),
    );
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Secciones de la plantilla</CardTitle>
        <CardDescription>
          Las secciones obligatorias no se pueden omitir.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {estado.map((seccion) => (
          <div
            key={seccion.sectionKey}
            className="flex items-center justify-between rounded-md border px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {labelDeSeccion(seccion.sectionKey)}
              </span>
              <Badge variant="outline">
                {seccion.isRequired ? "obligatoria" : "opcional"}
              </Badge>
            </div>
            {seccion.isRequired ? (
              <span className="text-sm text-zinc-500">
                {seccion.isEnabled ? "Habilitada" : "Omitida"}
              </span>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={pendiente === seccion.sectionKey}
                onClick={() => alternar(seccion.sectionKey, !seccion.isEnabled)}
              >
                {seccion.isEnabled ? "Omitir sección" : "Habilitar sección"}
              </Button>
            )}
          </div>
        ))}
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
