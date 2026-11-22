const MENSAJES: Record<string, string> = {
  Unauthenticated: "Necesitas iniciar sesión.",
  unauthenticated: "Necesitas iniciar sesión.",
  forbidden: "No tienes acceso a este proyecto.",
  required_section: "Esta sección es obligatoria y no se puede omitir.",
  not_found: "No se encontró el recurso.",
  invalid_name: "El nombre del proyecto no es válido.",
  invalid_definition: "Alguno de los campos excede la longitud permitida.",
  invalid_email_or_password: "Correo o contraseña incorrectos.",
};

/** Traduce errores del backend (Convex/Better Auth) a mensajes de la interfaz. */
export function mensajeDeError(error: unknown): string {
  const texto = error instanceof Error ? error.message : String(error);
  for (const [codigo, mensaje] of Object.entries(MENSAJES)) {
    if (texto.includes(codigo)) return mensaje;
  }
  return texto.length > 0 && texto.length < 200
    ? texto
    : "Error inesperado. Inténtalo de nuevo.";
}
