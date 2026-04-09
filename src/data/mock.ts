import { User, Company, Trip, DriverStatus, AIRecommendation, MarketPrice } from '@/types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Alex Synergy', email: 'alex@synergy.com', role: 'SUPER_ADMIN', status: 'ACTIVE' },
  { id: '2', name: 'John Owner', email: 'john@fuelco.com', role: 'ADMIN', companyId: 'c1', status: 'ACTIVE' },
  { id: '3', name: 'Sarah Ops', email: 'sarah@fuelco.com', role: 'DISPATCHER', companyId: 'c1', status: 'ACTIVE' },
  { id: '4', name: 'Mike Road', email: 'mike@fuelco.com', role: 'DRIVER', companyId: 'c1', status: 'ACTIVE' },
  { id: '5', name: 'Dave Lane', email: 'dave@fuelco.com', role: 'DRIVER', companyId: 'c1', status: 'ACTIVE' },
  { id: '6', name: 'Emily Shift', email: 'emily@fuelco.com', role: 'DRIVER', companyId: 'c1', status: 'PENDING' },
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'Texas Star Fuel Co.',
    address: '123 Energy Corridor, Houston, TX',
    contactEmail: 'admin@texasstar.com',
    contactPhone: '+1 (555) 123-4567',
    status: 'ACTIVE',
    metrics: { activeTrucks: 14, activeDrivers: 12, efficiency: 94 },
  },
  {
    id: 'c2',
    name: 'Midwest Express Logistics',
    address: '445 Industrial Pkwy, Chicago, IL',
    contactEmail: 'ops@midwestexpress.com',
    contactPhone: '+1 (555) 987-6543',
    status: 'WARNING',
    metrics: { activeTrucks: 8, activeDrivers: 6, efficiency: 82 },
  },
  {
    id: 'c3',
    name: 'Pacific Energy Transport',
    address: '88 Harbor Port, Long Beach, CA',
    contactEmail: 'hello@pacificenergy.com',
    contactPhone: '+1 (555) 234-5678',
    status: 'ACTIVE',
    metrics: { activeTrucks: 22, activeDrivers: 20, efficiency: 97 },
  }
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: 't1',
    status: 'STARTED',
    driverId: '4', // Mike Road
    truckId: 'TRK-902',
    origin: 'Houston Terminal A',
    originAddress: '900 Port Rd, Houston, TX',
    destination: 'Downtown Shell Station',
    destinationAddress: '100 Main St, Houston, TX',
    fuelType: 'DIESEL',
    liters: 8500,
    priority: 'HIGH',
    eta: '10:45 AM',
    progress: 45,
    estimatedDelayMins: 15,
    aiSuggestedRoute: 'I-45 via 610 Loop (Avoids 12m congestion)'
  },
  {
    id: 't2',
    status: 'PENDING',
    driverId: '5', // Dave Lane
    truckId: 'TRK-304',
    origin: 'Galveston Refinery',
    originAddress: '1500 Coastal Way, Galveston, TX',
    destination: 'Airport Logistics Hub',
    destinationAddress: '3000 Aviation Blvd, Houston, TX',
    fuelType: 'PREMIUM',
    liters: 12000,
    priority: 'MEDIUM',
    eta: '02:30 PM',
    progress: 0,
  },
  {
    id: 't3',
    status: 'DELIVERED',
    driverId: '4', // Mike Road previously
    truckId: 'TRK-902',
    origin: 'Pasadena Storage',
    originAddress: '400 Plant Rd, Pasadena, TX',
    destination: 'East Side Chevron',
    destinationAddress: '55 East Pkwy, Houston, TX',
    fuelType: 'UNLEADED',
    liters: 6000,
    priority: 'LOW',
    eta: '08:00 AM',
    progress: 100,
  }
];

export const MOCK_DRIVERS: DriverStatus[] = [
  { id: '4', name: 'Mike Road', status: 'ON_TRIP', fuelLevel: 45, hosMins: 240, currentLocation: { lat: 29.7604, lng: -95.3698 } },
  { id: '5', name: 'Dave Lane', status: 'AVAILABLE', fuelLevel: 80, hosMins: 480, currentLocation: { lat: 29.2982, lng: -94.7933 } },
  { id: '6', name: 'Emily Shift', status: 'OFFLINE', fuelLevel: 10, hosMins: 0 },
];

export const MOCK_AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'ai-1',
    type: 'ROUTE_OPTIMIZATION',
    title: 'Reroute Truck TRK-902',
    description: 'Heavy traffic detected on I-45 N. Recommend switching to Route 610 Loop.',
    rationale: 'Avoids 15-minute delay due to accident.',
    savings: '$420 / 15m',
    impact: 'MEDIUM',
    status: 'PENDING',
    tripId: 't1'
  },
  {
    id: 'ai-2',
    type: 'SUPPLIER_CHANGE',
    title: 'Source DIESEL from Supplier B',
    description: 'Supplier A price spiked by 4%. Supplier B has surplus.',
    rationale: 'Optimal regional pricing. Will save $0.12/gallon.',
    savings: '$1,440 on bulk order',
    impact: 'HIGH',
    status: 'PENDING'
  }
];

export const MOCK_MARKET_PRICES: MarketPrice[] = [
  { time: '08:00', houston: 2.45, dallas: 2.52, austin: 2.58 },
  { time: '10:00', houston: 2.48, dallas: 2.50, austin: 2.60 },
  { time: '12:00', houston: 2.42, dallas: 2.48, austin: 2.55 },
  { time: '14:00', houston: 2.40, dallas: 2.45, austin: 2.52 },
  { time: '16:00', houston: 2.44, dallas: 2.47, austin: 2.54 },
];
