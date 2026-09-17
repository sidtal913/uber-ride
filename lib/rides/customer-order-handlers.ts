import { NextRequest } from "next/server";
import { validationErrorResponse } from "@/lib/api/errors";
import type { AuthUser } from "@/lib/auth/config";
import { createRide, listRidesForCustomer } from "@/lib/db/rides-repository";
import { computeQuote } from "@/lib/rides/fare";
import { createRideRequestSchema } from "@/lib/rides/validation";

export async function listCustomerOrders(request: NextRequest, user: AuthUser) {
  const limit = Math.min(
    100,
    Math.max(1, Number(request.nextUrl.searchParams.get("limit") ?? "20")),
  );
  const cursor = request.nextUrl.searchParams.get("cursor") ?? undefined;
  const result = await listRidesForCustomer(user.sub, limit, cursor);
  return Response.json(result);
}

export async function createCustomerOrder(request: NextRequest, user: AuthUser) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "validation_error", message: "Invalid JSON body" },
      { status: 422 },
    );
  }

  const parsed = createRideRequestSchema.safeParse(body);
  if (!parsed.success) return validationErrorResponse(parsed.error);

  if (!parsed.data.acceptEstimatedFare) {
    return Response.json(
      {
        error: "validation_error",
        message: "Customer must accept estimated fare to book",
      },
      { status: 422 },
    );
  }

  const quote = computeQuote(parsed.data.pickup, parsed.data.dropoff);
  const ride = await createRide({
    customerId: user.sub,
    driverId: null,
    status: "requested",
    pickup: parsed.data.pickup,
    dropoff: parsed.data.dropoff,
    estimatedDistanceKm: quote.estimatedDistanceKm,
    estimatedDurationMinutes: quote.estimatedDurationMinutes,
    estimatedFareCents: quote.estimatedFareCents,
    currency: quote.currency,
  });

  return Response.json(ride, { status: 201 });
}
