import { NextRequest } from "next/server";
import { jsonAuthError, requireAuth } from "@/lib/auth/require-auth";
import { validationErrorResponse } from "@/lib/api/errors";
import { computeQuote } from "@/lib/rides/fare";
import { rideQuoteRequestSchema } from "@/lib/rides/validation";

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request, { roles: ["customer", "driver"] });
  if (!auth.ok) return jsonAuthError(auth);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "validation_error", message: "Invalid JSON body" },
      { status: 422 },
    );
  }

  const parsed = rideQuoteRequestSchema.safeParse(body);
  if (!parsed.success) return validationErrorResponse(parsed.error);

  const quote = computeQuote(parsed.data.pickup, parsed.data.dropoff);
  return Response.json(quote);
}
