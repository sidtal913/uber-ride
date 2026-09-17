import { NextRequest } from "next/server";
import { verifyAccessToken } from "./jwt";
import type { AppRole, AuthUser } from "./config";

export type AuthResult =
  | { ok: true; user: AuthUser }
  | { ok: false; status: 401 | 403; error: string; message: string };

function parseBearer(header: string | null): string | null {
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice("Bearer ".length).trim();
  return token.length > 0 ? token : null;
}

export async function requireAuth(
  request: NextRequest,
  options?: { roles?: AppRole[] },
): Promise<AuthResult> {
  const token = parseBearer(request.headers.get("authorization"));
  if (!token) {
    return {
      ok: false,
      status: 401,
      error: "unauthorized",
      message: "Authentication required",
    };
  }
  const user = await verifyAccessToken(token);
  if (!user) {
    return {
      ok: false,
      status: 401,
      error: "unauthorized",
      message: "Authentication required",
    };
  }
  const required = options?.roles;
  if (required && required.length > 0) {
    const hasRole = required.some((r) => user.roles.includes(r));
    if (!hasRole) {
      return {
        ok: false,
        status: 403,
        error: "forbidden",
        message: "Insufficient role for this resource",
      };
    }
  }
  return { ok: true, user };
}

export function jsonAuthError(result: Extract<AuthResult, { ok: false }>): Response {
  return Response.json(
    { error: result.error, message: result.message },
    { status: result.status },
  );
}
