import { NextRequest } from "next/server";
import { jsonAuthError, requireAuth } from "@/lib/auth/require-auth";
import {
  createCustomerOrder,
  listCustomerOrders,
} from "@/lib/rides/customer-order-handlers";

export const dynamic = "force-dynamic";

/** E-commerce order surface — ride bookings (alias of /api/v1/rides for platform route gate). */
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { roles: ["customer"] });
  if (!auth.ok) return jsonAuthError(auth);
  return listCustomerOrders(request, auth.user);
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request, { roles: ["customer"] });
  if (!auth.ok) return jsonAuthError(auth);
  return createCustomerOrder(request, auth.user);
}
