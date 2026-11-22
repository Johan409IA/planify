"use client";

import { useState } from "react";
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
import { authClient } from "@/lib/auth-client";
import { mensajeDeError } from "@/lib/mensajes-error";

export function ResetPasswordForm({ token }: { token: string | null }) {
  const [password, setPassword] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function alEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (password !== confirmacion) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setEnviando(true);
    setError(null);
    const { error } = await authClient.resetPassword({
      newPassword: password,
      token: token ?? undefined,
    });
    setEnviando(false);
    if (error) {
      setError(mensajeDeError(error));
      return;
    }
    setEnviado(true);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Restablecer contraseña</CardTitle>
        <CardDescription>
          {enviado
            ? "Contraseña actualizada. Ya puedes iniciar sesión."
            : "Elige una nueva contraseña."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {enviado ? (
          <a href="/login" className="text-sm underline">
            Ir a iniciar sesión
          </a>
        ) : (
          <form onSubmit={alEnviar} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Nueva contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmacion">Repetir contraseña</Label>
              <Input
                id="confirmacion"
                type="password"
                required
                minLength={8}
                value={confirmacion}
                onChange={(e) => setConfirmacion(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
            <Button type="submit" disabled={enviando}>
              {enviando ? "Guardando…" : "Guardar contraseña"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
