import { randomUUID } from "crypto";
import type { Ride, RideStatus } from "@/lib/rides/types";
import { getPool } from "./pool";

const memoryStore = new Map<string, Ride>();

function rowToRide(row: Record<string, unknown>): Ride {
  return {
    id: String(row.id),
    createdAt: new Date(row.created_at as string | Date).toISOString(),
    updatedAt: new Date(row.updated_at as string | Date).toISOString(),
    customerId: String(row.customer_id),
    driverId: row.driver_id ? String(row.driver_id) : null,
    status: row.status as RideStatus,
    pickup: {
      address: String(row.pickup_address),
      lat: Number(row.pickup_lat),
      lng: Number(row.pickup_lng),
    },
    dropoff: {
      address: String(row.dropoff_address),
      lat: Number(row.dropoff_lat),
      lng: Number(row.dropoff_lng),
    },
    estimatedDistanceKm: Number(row.estimated_distance_km),
    estimatedDurationMinutes: Number(row.estimated_duration_minutes),
    estimatedFareCents: Number(row.estimated_fare_cents),
    currency: String(row.currency),
  };
}

export async function createRide(
  input: Omit<Ride, "id" | "createdAt" | "updatedAt">,
): Promise<Ride> {
  const now = new Date().toISOString();
  const ride: Ride = {
    ...input,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  const pool = getPool();
  if (!pool) {
    memoryStore.set(ride.id, ride);
    return ride;
  }

  const result = await pool.query(
    `INSERT INTO rides (
      id, created_at, updated_at, customer_id, driver_id, status,
      pickup_address, pickup_lat, pickup_lng,
      dropoff_address, dropoff_lat, dropoff_lng,
      estimated_distance_km, estimated_duration_minutes, estimated_fare_cents, currency
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9,
      $10, $11, $12,
      $13, $14, $15, $16
    ) RETURNING *`,
    [
      ride.id,
      ride.createdAt,
      ride.updatedAt,
      ride.customerId,
      ride.driverId,
      ride.status,
      ride.pickup.address,
      ride.pickup.lat,
      ride.pickup.lng,
      ride.dropoff.address,
      ride.dropoff.lat,
      ride.dropoff.lng,
      ride.estimatedDistanceKm,
      ride.estimatedDurationMinutes,
      ride.estimatedFareCents,
      ride.currency,
    ],
  );
  return rowToRide(result.rows[0]);
}

export async function getRideById(id: string): Promise<Ride | null> {
  const pool = getPool();
  if (!pool) {
    return memoryStore.get(id) ?? null;
  }
  const result = await pool.query("SELECT * FROM rides WHERE id = $1", [id]);
  if (result.rowCount === 0) return null;
  return rowToRide(result.rows[0]);
}

export async function listRidesForCustomer(
  customerId: string,
  limit: number,
  cursor?: string,
): Promise<{ items: Ride[]; nextCursor: string | null }> {
  const pool = getPool();
  if (!pool) {
    let items = [...memoryStore.values()]
      .filter((r) => r.customerId === customerId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (cursor) {
      const idx = items.findIndex((r) => r.id === cursor);
      items = idx >= 0 ? items.slice(idx + 1) : items;
    }
    const hasMore = items.length > limit;
    const page = items.slice(0, limit);
    const nextCursor = hasMore ? (page[page.length - 1]?.id ?? null) : null;
    return { items: page, nextCursor };
  }

  const params: unknown[] = [customerId, limit + 1];
  let sql = `
    SELECT * FROM rides
    WHERE customer_id = $1
  `;
  if (cursor) {
    sql += ` AND created_at < (SELECT created_at FROM rides WHERE id = $3)`;
    params.push(cursor);
  }
  sql += ` ORDER BY created_at DESC LIMIT $2`;

  const result = await pool.query(sql, params);
  const rows = result.rows.map(rowToRide);
  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  const nextCursor = hasMore ? items[items.length - 1]?.id ?? null : null;
  return { items, nextCursor };
}

export async function listAllRides(
  limit: number,
  status?: RideStatus,
): Promise<{ items: Ride[]; nextCursor: string | null }> {
  const pool = getPool();
  if (!pool) {
    let items = [...memoryStore.values()].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
    if (status) items = items.filter((r) => r.status === status);
    return { items: items.slice(0, limit), nextCursor: null };
  }

  const params: unknown[] = [limit];
  let sql = "SELECT * FROM rides";
  if (status) {
    sql += " WHERE status = $2";
    params.push(status);
  }
  sql += " ORDER BY created_at DESC LIMIT $1";
  const result = await pool.query(sql, params);
  return { items: result.rows.map(rowToRide), nextCursor: null };
}
