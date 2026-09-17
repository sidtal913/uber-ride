export const authConfig = {
  jwtSecret: process.env.JWT_SECRET ?? "dev-only-change-me-use-cognito-in-prod",
  jwtIssuer: process.env.JWT_ISSUER ?? "uber-ride-api",
  jwtAudience: process.env.JWT_AUDIENCE ?? "uber-ride-clients",
};

export type AppRole = "customer" | "driver" | "admin";

export type AuthUser = {
  sub: string;
  email?: string;
  roles: AppRole[];
};
