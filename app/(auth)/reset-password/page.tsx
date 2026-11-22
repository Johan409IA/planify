import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

async function ContenidoRestablecer({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { token } = await searchParams;
  return <ResetPasswordForm token={typeof token === "string" ? token : null} />;
}

export default function ResetPasswordPage(props: PageProps<"/reset-password">) {
  return (
    <Suspense fallback={<p className="text-sm">Cargando…</p>}>
      <ContenidoRestablecer searchParams={props.searchParams} />
    </Suspense>
  );
}
