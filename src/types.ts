export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'DISPATCHER' | 'DRIVER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string; // Links Admin/Dispatcher/Driver to a specific company
  avatar?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
}

export interface Company {
  id: string;
  name: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  logoUrl?: string;
  status: 'ACTIVE' | 'WARNING' | 'CRITICAL';
  metrics: {
    activeTrucks: number;
    activeDrivers: number;
    efficiency: number; // percentage
  };
}

export interface Trip {
  id: string;
  status: 'PENDING' | 'STARTED' | 'LOADED' | 'DELIVERED' | 'CANCELLED';
  driverId: string;
  truckId: string;
  origin: string;
  originAddress: string;
  destination: string;
  destinationAddress: string;
  fuelType: 'DIESEL' | 'UNLEADED' | 'PREMIUM';
  liters: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  eta: string;
  progress: number;
  estimatedDelayMins?: number;
  aiSuggestedRoute?: string;
}

export interface DriverStatus {
  id: string;
  name: string;
  status: 'AVAILABLE' | 'ON_TRIP' | 'OFFLINE';
  fuelLevel: number;
  hosMins: number; // Hours of Service left in minutes
  currentLocation?: { lat: number; lng: number };
  avatar?: string;
}

export interface AIRecommendation {
  id: string;
  type: 'ROUTE_OPTIMIZATION' | 'SUPPLIER_CHANGE' | 'FLEET_REALLOCATION' | 'PRICE_ALERT';
  title: string;
  description: string;
  rationale: string;
  savings: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  tripId?: string;
}

export interface MarketPrice {
  time: string;
  houston: number;
  dallas: number;
  austin: number;
}
