import { z } from "zod";

export const geoPointSchema = z.object({
  address: z.string().min(3),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const rideQuoteRequestSchema = z.object({
  pickup: geoPointSchema,
  dropoff: geoPointSchema,
});

export const createRideRequestSchema = z.object({
  pickup: geoPointSchema,
  dropoff: geoPointSchema,
  acceptEstimatedFare: z.boolean().optional().default(true),
});
