import type { GeoPoint } from "./types";

const EARTH_RADIUS_KM = 6371;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Haversine distance between two WGS84 points. */
export function distanceKm(a: GeoPoint, b: GeoPoint): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/** Montreal urban estimate: base + per-km + per-minute (CAD). */
export function estimateFareCadCents(distanceKm: number, durationMinutes: number): number {
  const baseCad = 3.5;
  const perKm = 1.15;
  const perMinute = 0.35;
  const total = baseCad + distanceKm * perKm + durationMinutes * perMinute;
  return Math.round(total * 100);
}

export function estimateDurationMinutes(distanceKm: number): number {
  const avgSpeedKmh = 28;
  return Math.max(5, Math.round((distanceKm / avgSpeedKmh) * 60));
}

export function computeQuote(pickup: GeoPoint, dropoff: GeoPoint) {
  const estimatedDistanceKm = Math.round(distanceKm(pickup, dropoff) * 100) / 100;
  const estimatedDurationMinutes = estimateDurationMinutes(estimatedDistanceKm);
  const estimatedFareCents = estimateFareCadCents(estimatedDistanceKm, estimatedDurationMinutes);
  return {
    estimatedDistanceKm,
    estimatedDurationMinutes,
    estimatedFareCents,
    currency: "CAD" as const,
  };
}
