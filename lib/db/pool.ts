import { Pool } from "pg";

let pool: Pool | null = null;
let poolInitFailed = false;

export function getPool(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url || poolInitFailed) return null;
  if (!pool) {
    try {
      pool = new Pool({ connectionString: url, max: 5 });
      pool.on("error", () => {
        poolInitFailed = true;
      });
    } catch {
      poolInitFailed = true;
      return null;
    }
  }
  return pool;
}

export async function checkDatabaseConnection(): Promise<"connected" | "unavailable"> {
  const p = getPool();
  if (!p) return "unavailable";
  try {
    await p.query("SELECT 1");
    return "connected";
  } catch {
    return "unavailable";
  }
}

export type DatabaseMode = "postgresql" | "in-memory";

export function getDatabaseMode(): DatabaseMode {
  return process.env.DATABASE_URL ? "postgresql" : "in-memory";
}
