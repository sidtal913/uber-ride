import { jwtVerify, SignJWT } from "jose";
import { authConfig, type AppRole, type AuthUser } from "./config";

const encoder = new TextEncoder();

function normalizeRoles(raw: unknown): AppRole[] {
  if (!Array.isArray(raw)) return [];
  const allowed: AppRole[] = ["customer", "driver", "admin"];
  return raw.filter((r): r is AppRole => typeof r === "string" && allowed.includes(r as AppRole));
}

export async function verifyAccessToken(token: string): Promise<AuthUser | null> {
  try {
    const key = encoder.encode(authConfig.jwtSecret);
    const { payload } = await jwtVerify(token, key, {
      issuer: authConfig.jwtIssuer,
      audience: authConfig.jwtAudience,
    });
    const sub = typeof payload.sub === "string" ? payload.sub : null;
    if (!sub) return null;
    const roles = normalizeRoles(payload.roles);
    if (roles.length === 0) {
      roles.push("customer");
    }
    return {
      sub,
      email: typeof payload.email === "string" ? payload.email : undefined,
      roles,
    };
  } catch {
    return null;
  }
}

/** Dev-only helper for integration tests and local clients — not exposed as a public route. */
export async function signDevToken(input: {
  sub: string;
  email?: string;
  roles: AppRole[];
}): Promise<string> {
  const key = encoder.encode(authConfig.jwtSecret);
  return new SignJWT({ email: input.email, roles: input.roles })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(input.sub)
    .setIssuer(authConfig.jwtIssuer)
    .setAudience(authConfig.jwtAudience)
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key);
}
