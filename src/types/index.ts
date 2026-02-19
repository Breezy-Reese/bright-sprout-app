export interface Matatu {
  _id: string;
  plateNumber: string;
  capacity: number;
  status: "active" | "maintenance" | "inactive";
  assignedRouteId: string | null;
  owner: string;
  model: string;
  year: number;
}

export interface Route {
  _id: string;
  name: string;
  from: string;
  to: string;
  distance: string;
  fare: number;
  assignedMatatus: string[];
}

export interface Trip {
  _id: string;
  matatuId: string;
  routeId: string;
  driver: string;
  conductor: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  passengerCount: number;
}

export interface Alert {
  _id: string;
  matatuId: string;
  type: "overloading" | "off-route" | "safety" | "speed" | "maintenance";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  timestamp: string;
  status: "new" | "acknowledged" | "resolved";
}
