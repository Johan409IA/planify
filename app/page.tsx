import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getToken } from "@/lib/auth-server";

async function Entrada(): Promise<never> {
  const token = await getToken();
  redirect(token ? "/projects" : "/login");
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Entrada />
    </Suspense>
  );
}
