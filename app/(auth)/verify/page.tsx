import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function ContenidoVerificacion({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const { error } = await searchParams;
  const fallo = typeof error === "string" && error.length > 0;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verificación de correo</CardTitle>
        <CardDescription>
          {fallo
            ? "No pudimos verificar tu correo. Puedes iniciar sesión y solicitar un nuevo enlace."
            : "Tu correo quedó verificado y tu sesión está lista."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <a href="/projects" className="text-sm underline">
          Ir a mis proyectos
        </a>
      </CardContent>
    </Card>
  );
}

export default function VerifyPage(props: PageProps<"/verify">) {
  return (
    <Suspense fallback={<p className="text-sm">Cargando…</p>}>
      <ContenidoVerificacion searchParams={props.searchParams} />
    </Suspense>
  );
}
