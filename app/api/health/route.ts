import { checkDatabaseConnection, getDatabaseMode } from "@/lib/db/pool";

export const dynamic = "force-dynamic";

export async function GET() {
  const mode = getDatabaseMode();
  let database: "connected" | "in-memory" | "unavailable" = "in-memory";
  if (mode === "postgresql") {
    const status = await checkDatabaseConnection();
    database = status === "connected" ? "connected" : "unavailable";
  }

  return Response.json({
    status: "ok",
    service: "uber-ride-api",
    timestamp: new Date().toISOString(),
    database,
  });
}
