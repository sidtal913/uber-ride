-- Uber Ride — PostgreSQL schema (Montreal rides)
-- Apply once: psql "$DATABASE_URL" -f lib/db/schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  customer_id TEXT NOT NULL,
  driver_id TEXT NULL,
  status TEXT NOT NULL CHECK (
    status IN ('quoted', 'requested', 'matched', 'in_progress', 'completed', 'cancelled')
  ),
  pickup_address TEXT NOT NULL,
  pickup_lat DOUBLE PRECISION NOT NULL,
  pickup_lng DOUBLE PRECISION NOT NULL,
  dropoff_address TEXT NOT NULL,
  dropoff_lat DOUBLE PRECISION NOT NULL,
  dropoff_lng DOUBLE PRECISION NOT NULL,
  estimated_distance_km NUMERIC(8, 2) NOT NULL,
  estimated_duration_minutes INTEGER NOT NULL,
  estimated_fare_cents INTEGER NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'CAD'
);

CREATE INDEX IF NOT EXISTS idx_rides_customer_created ON rides (customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rides_status ON rides (status);
