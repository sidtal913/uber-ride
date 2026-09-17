import { NextRequest } from "next/server";
import { jsonAuthError, requireAuth } from "@/lib/auth/require-auth";
import { listAllRides } from "@/lib/db/rides-repository";
import type { RideStatus } from "@/lib/rides/types";

const STATUSES: RideStatus[] = [
  "quoted",
  "requested",
  "matched",
  "in_progress",
  "completed",
  "cancelled",
];

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { roles: ["admin"] });
  if (!auth.ok) return jsonAuthError(auth);

  const limit = Math.min(
    100,
    Math.max(1, Number(request.nextUrl.searchParams.get("limit") ?? "50")),
  );
  const statusParam = request.nextUrl.searchParams.get("status");
  const status =
    statusParam && STATUSES.includes(statusParam as RideStatus)
      ? (statusParam as RideStatus)
      : undefined;

  const result = await listAllRides(limit, status);
  return Response.json(result);
}
