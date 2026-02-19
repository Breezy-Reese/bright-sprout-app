// Get today's date and yesterday's date for dynamic data
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

const matatus = [
  {
    _id: "m1",
    plateNumber: "KCA 123A",
    capacity: 33,
    status: "active",
    assignedRouteId: "r1",
    owner: "John Mwangi",
    model: "Toyota HiAce",
    year: 2021,
    createdAt: "2026-02-12T10:13:15.561Z",
    updatedAt: "2026-02-12T10:13:15.561Z",
    __v: 0
  },
  {
    _id: "m2",
    plateNumber: "KBZ 456B",
    capacity: 14,
    status: "active",
    assignedRouteId: "r2",
    owner: "Mary Wanjiku",
    model: "Nissan Matatu",
    year: 2020,
    createdAt: "2026-02-12T10:13:15.562Z",
    updatedAt: "2026-02-12T10:13:15.562Z",
    __v: 0
  },
  {
    _id: "m3",
    plateNumber: "KDA 789C",
    capacity: 33,
    status: "maintenance",
    assignedRouteId: null,
    owner: "Peter Ochieng",
    model: "Isuzu NQR",
    year: 2019,
    createdAt: "2026-02-12T10:13:15.562Z",
    updatedAt: "2026-02-12T10:13:15.562Z",
    __v: 0
  },
  {
    _id: "m4",
    plateNumber: "KCB 321D",
    capacity: 14,
    status: "active",
    assignedRouteId: "r3",
    owner: "Grace Akinyi",
    model: "Toyota HiAce",
    year: 2022,
    createdAt: "2026-02-12T10:13:15.562Z",
    updatedAt: "2026-02-12T10:13:15.562Z",
    __v: 0
  },
  {
    _id: "m5",
    plateNumber: "KDD 654E",
    capacity: 33,
    status: "inactive",
    assignedRouteId: null,
    owner: "James Kariuki",
    model: "Isuzu NQR",
    year: 2018,
    createdAt: "2026-02-12T10:13:15.562Z",
    updatedAt: "2026-02-12T10:13:15.562Z",
    __v: 0
  },
  {
    _id: "m6",
    plateNumber: "KBB 987F",
    capacity: 14,
    status: "active",
    assignedRouteId: "r1",
    owner: "Susan Njeri",
    model: "Nissan Matatu",
    year: 2023,
    createdAt: "2026-02-12T10:13:15.562Z",
    updatedAt: "2026-02-12T10:13:15.562Z",
    __v: 0
  }
];

const routes = [
  {
    _id: "r1",
    name: "Route 58",
    from: "CBD Nairobi",
    to: "Eastleigh",
    distance: "8 km",
    fare: 50,
    assignedMatatus: ["m1", "m6"],
    createdAt: "2026-02-12T10:13:15.561Z",
    updatedAt: "2026-02-12T10:13:15.561Z",
    __v: 0
  },
  {
    _id: "r2",
    name: "Route 33",
    from: "CBD Nairobi",
    to: "Westlands",
    distance: "6 km",
    fare: 40,
    assignedMatatus: ["m2"],
    createdAt: "2026-02-12T10:13:15.561Z",
    updatedAt: "2026-02-12T10:13:15.561Z",
    __v: 0
  },
  {
    _id: "r3",
    name: "Route 46",
    from: "CBD Nairobi",
    to: "Langata",
    distance: "12 km",
    fare: 70,
    assignedMatatus: ["m4"],
    createdAt: "2026-02-12T10:13:15.561Z",
    updatedAt: "2026-02-12T10:13:15.561Z",
    __v: 0
  },
  {
    _id: "r4",
    name: "Route 111",
    from: "CBD Nairobi",
    to: "Thika",
    distance: "45 km",
    fare: 150,
    assignedMatatus: [],
    createdAt: "2026-02-12T10:13:15.561Z",
    updatedAt: "2026-02-12T10:13:15.561Z",
    __v: 0
  }
];

const trips = [
  {
    _id: "t1",
    matatuId: "m1",
    routeId: "r1",
    driver: "David Kamau",
    conductor: "Brian Otieno",
    date: today,
    departureTime: "06:30",
    arrivalTime: "07:15",
    passengerCount: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  },
  {
    _id: "t2",
    matatuId: "m2",
    routeId: "r2",
    driver: "Samuel Njoroge",
    conductor: "Kevin Ouma",
    date: today,
    departureTime: "07:00",
    arrivalTime: "07:35",
    passengerCount: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  },
  {
    _id: "t3",
    matatuId: "m4",
    routeId: "r3",
    driver: "Daniel Mutua",
    conductor: "Alex Wekesa",
    date: today,
    departureTime: "06:45",
    arrivalTime: "07:40",
    passengerCount: 14,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  },
  {
    _id: "t4",
    matatuId: "m6",
    routeId: "r1",
    driver: "Patrick Maina",
    conductor: "Joseph Kiprop",
    date: today,
    departureTime: "08:00",
    arrivalTime: "08:50",
    passengerCount: 13,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  },
  {
    _id: "t5",
    matatuId: "m1",
    routeId: "r1",
    driver: "David Kamau",
    conductor: "Brian Otieno",
    date: yesterday,
    departureTime: "06:30",
    arrivalTime: "07:20",
    passengerCount: 28,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  },
  {
    _id: "t6",
    matatuId: "m2",
    routeId: "r2",
    driver: "Samuel Njoroge",
    conductor: "Kevin Ouma",
    date: yesterday,
    departureTime: "07:15",
    arrivalTime: "07:50",
    passengerCount: 14,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  }
];

const alerts = [
  {
    _id: "a1",
    matatuId: "m1",
    type: "overloading",
    severity: "high",
    message: "Passenger count exceeds capacity (36/33)",
    timestamp: `${today}T08:30:00`,
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  },
  {
    _id: "a2",
    matatuId: "m2",
    type: "speed",
    severity: "medium",
    message: "Speed limit exceeded on Uhuru Highway (85 km/h in 50 zone)",
    timestamp: `${today}T07:45:00`,
    status: "acknowledged",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  },
  {
    _id: "a3",
    matatuId: "m4",
    type: "off-route",
    severity: "low",
    message: "Deviated from assigned Route 46 near Kibera",
    timestamp: `${yesterday}T16:20:00`,
    status: "resolved",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  },
  {
    _id: "a4",
    matatuId: "m3",
    type: "maintenance",
    severity: "critical",
    message: "Brake system inspection overdue by 15 days",
    timestamp: `${yesterday}T09:00:00`,
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  },
  {
    _id: "a5",
    matatuId: "m6",
    type: "safety",
    severity: "high",
    message: "Missing fire extinguisher during inspection",
    timestamp: `${today}T10:00:00`,
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  }
];

module.exports = { matatus, routes, trips, alerts };
