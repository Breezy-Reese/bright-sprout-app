const API_BASE_URL = 'http://localhost:5001/api';

export interface Matatu {
  _id: string;
  plateNumber: string;
  capacity: number;
  status: 'active' | 'maintenance' | 'inactive';
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
  type: 'overloading' | 'off-route' | 'safety' | 'speed' | 'maintenance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  status: 'new' | 'acknowledged' | 'resolved';
}

export const api = {
  matatus: {
    getAll: async (): Promise<Matatu[]> => {
      const response = await fetch(`${API_BASE_URL}/matatus`);
      if (!response.ok) throw new Error('Failed to fetch matatus');
      return response.json();
    },
  },
  routes: {
    getAll: async (): Promise<Route[]> => {
      const response = await fetch(`${API_BASE_URL}/routes`);
      if (!response.ok) throw new Error('Failed to fetch routes');
      return response.json();
    },
  },
  trips: {
    getAll: async (): Promise<Trip[]> => {
      const response = await fetch(`${API_BASE_URL}/trips`);
      if (!response.ok) throw new Error('Failed to fetch trips');
      return response.json();
    },
  },
  alerts: {
    getAll: async (): Promise<Alert[]> => {
      const response = await fetch(`${API_BASE_URL}/alerts`);
      if (!response.ok) throw new Error('Failed to fetch alerts');
      return response.json();
    },
  },
};
