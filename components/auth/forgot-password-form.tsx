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

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function alEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEnviando(true);
    setError(null);
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
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
        <CardTitle>Recuperar contraseña</CardTitle>
        <CardDescription>
          {enviado
            ? "Si el correo existe, te enviamos un enlace de recuperación (en desarrollo, también en consola)."
            : "Te enviaremos un enlace para restablecerla."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {enviado ? (
          <a href="/login" className="text-sm underline">
            Volver a iniciar sesión
          </a>
        ) : (
          <form onSubmit={alEnviar} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
            <Button type="submit" disabled={enviando}>
              {enviando ? "Enviando…" : "Enviar enlace"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
