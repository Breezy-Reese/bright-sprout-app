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
      try {
        const response = await fetch(`${API_BASE_URL}/matatus`);
        if (!response.ok) return [];
        const data = await response.json();
        if (!Array.isArray(data)) return [];
        // mongoose adds `id` virtual by default but make sure we always have it
        return data.map((m: any) => ({ ...m, id: m.id || m._id }));
      } catch (e) {
        console.error('matatus.getAll failed', e);
        return [];
      }
    },
    create: async (matatu: Omit<Matatu, '_id'>): Promise<Matatu> => {
      const response = await fetch(`${API_BASE_URL}/matatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matatu),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error('Failed to create matatu: ' + text);
      }
      const data = await response.json();
      return { ...data, id: data.id || data._id };
    },
  },
  routes: {
    getAll: async (): Promise<Route[]> => {
      try {
        const response = await fetch(`${API_BASE_URL}/routes`);
        if (!response.ok) return [];
        const data = await response.json();
        if (!Array.isArray(data)) return [];
        return data.map((r: any) => ({ ...r, id: r.id || r._id }));
      } catch (e) {
        console.error('routes.getAll failed', e);
        return [];
      }
    },
  },

  trips: {
    getAll: async (): Promise<Trip[]> => {
      try {
        const response = await fetch(`${API_BASE_URL}/trips`);
        if (!response.ok) return [];
        const data = await response.json();
        if (!Array.isArray(data)) return [];
        return data.map((t: any) => ({ ...t, id: t.id || t._id }));
      } catch (e) {
        console.error('trips.getAll failed', e);
        return [];
      }
    },
  },

  alerts: {
    getAll: async (): Promise<Alert[]> => {
      try {
        const response = await fetch(`${API_BASE_URL}/alerts`);
        if (!response.ok) return [];
        const data = await response.json();
        if (!Array.isArray(data)) return [];
        return data.map((a: any) => ({ ...a, id: a.id || a._id }));
      } catch (e) {
        console.error('alerts.getAll failed', e);
        return [];
      }
    },
  },

};
