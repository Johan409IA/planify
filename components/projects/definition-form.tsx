"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateProjectDefinition } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mensajeDeError } from "@/lib/mensajes-error";

export interface DefinitionValues {
  name: string;
  description: string;
  problem: string;
  solutionProposal: string;
  targetAudience: string;
  successCriteria: string;
  scopeIn: string;
  scopeOut: string;
}

const CAMPOS_LARGOS: (keyof DefinitionValues)[] = [
  "problem",
  "solutionProposal",
  "targetAudience",
  "successCriteria",
  "scopeIn",
  "scopeOut",
];

const ETIQUETAS_LARGAS: Record<string, string> = {
  problem: "Problema",
  solutionProposal: "Propuesta de solución",
  targetAudience: "Público objetivo",
  successCriteria: "Criterios de éxito",
  scopeIn: "Alcance incluido",
  scopeOut: "Alcance excluido",
};

export function DefinitionForm({
  projectId,
  valores,
}: {
  projectId: string;
  valores: DefinitionValues;
}) {
  const router = useRouter();
  const [campos, setCampos] = useState<DefinitionValues>(valores);
  const [error, setError] = useState<string | null>(null);
  const [guardado, setGuardado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  function cambiar(campo: keyof DefinitionValues, valor: string) {
    setGuardado(false);
    setCampos((previo) => ({ ...previo, [campo]: valor }));
  }

  async function alEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEnviando(true);
    setError(null);
    setGuardado(false);
    const resultado = await updateProjectDefinition({
      projectId,
      name: campos.name,
      ...Object.fromEntries(
        CAMPOS_LARGOS.map((campo) => [
          campo,
          campos[campo].trim() === "" ? null : campos[campo],
        ]),
      ),
    });
    setEnviando(false);
    if (!resultado.ok) {
      setError(mensajeDeError(new Error(resultado.error)));
      return;
    }
    setGuardado(true);
    router.refresh();
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Definición del proyecto</CardTitle>
        <CardDescription>
          Problema, propuesta, público objetivo, criterios de éxito y alcance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={alEnviar} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              required
              maxLength={200}
              value={campos.name}
              onChange={(e) => cambiar("name", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Descripción general</Label>
            <Textarea
              id="description"
              rows={2}
              value={campos.description}
              onChange={(e) => cambiar("description", e.target.value)}
            />
          </div>
          {CAMPOS_LARGOS.map((campo) => (
            <div key={campo} className="flex flex-col gap-2">
              <Label htmlFor={campo}>{ETIQUETAS_LARGAS[campo]}</Label>
              <Textarea
                id={campo}
                rows={3}
                value={campos[campo]}
                onChange={(e) => cambiar(campo, e.target.value)}
              />
            </div>
          ))}
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          {guardado && (
            <p role="status" className="text-sm text-green-700">
              Definición guardada.
            </p>
          )}
          <Button type="submit" disabled={enviando} className="self-start">
            {enviando ? "Guardando…" : "Guardar definición"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
