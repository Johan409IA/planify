"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProjectFromTemplate } from "@/app/actions/projects";
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

export function CreateProjectForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function alEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEnviando(true);
    setError(null);
    const resultado = await createProjectFromTemplate({
      name,
      description: description.trim() === "" ? null : description,
    });
    if (!resultado.ok) {
      setEnviando(false);
      setError(mensajeDeError(new Error(resultado.error)));
      return;
    }
    router.push(`/projects/${resultado.data.projectId}`);
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Nuevo proyecto</CardTitle>
        <CardDescription>
          Se creará con la plantilla base y sus secciones; tú serás el
          propietario.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={alEnviar} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nombre del proyecto</Label>
            <Input
              id="name"
              required
              maxLength={200}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Descripción general (opcional)</Label>
            <Textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <Button type="submit" disabled={enviando}>
            {enviando ? "Creando…" : "Crear proyecto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
