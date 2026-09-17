import { NextRequest } from "next/server";
import { jsonAuthError, requireAuth } from "@/lib/auth/require-auth";
import { getRideById } from "@/lib/db/rides-repository";

type Params = { params: Promise<{ rideId: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(request, { roles: ["customer", "admin"] });
  if (!auth.ok) return jsonAuthError(auth);

  const { rideId } = await params;
  const ride = await getRideById(rideId);
  if (!ride) {
    return Response.json(
      { error: "not_found", message: "Ride not found" },
      { status: 404 },
    );
  }

  const isAdmin = auth.user.roles.includes("admin");
  if (!isAdmin && ride.customerId !== auth.user.sub) {
    return Response.json(
      { error: "forbidden", message: "Insufficient role for this resource" },
      { status: 403 },
    );
  }

  return Response.json(ride);
}
