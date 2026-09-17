export type GeoPoint = {
  address: string;
  lat: number;
  lng: number;
};

export type RideStatus =
  | "quoted"
  | "requested"
  | "matched"
  | "in_progress"
  | "completed"
  | "cancelled";

export type Ride = {
  id: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  driverId: string | null;
  status: RideStatus;
  pickup: GeoPoint;
  dropoff: GeoPoint;
  estimatedDistanceKm: number;
  estimatedDurationMinutes: number;
  estimatedFareCents: number;
  currency: string;
};

export type RideQuoteResponse = {
  estimatedDistanceKm: number;
  estimatedDurationMinutes: number;
  estimatedFareCents: number;
  currency: string;
};
