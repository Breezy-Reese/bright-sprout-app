// Get today's date and yesterday's date for dynamic data
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Matatu = require('./models/Matatu');
const Route = require('./models/Route');
const Trip = require('./models/Trip');
const Alert = require('./models/Alert');
const User = require('./models/User');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Matatu.deleteMany();
    await Route.deleteMany();
    await Trip.deleteMany();
    await Alert.deleteMany();
    await User.deleteMany();

    // Create sample users
    const users = await User.create([
      {
        username: 'admin',
        email: 'admin@quicktransit.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        username: 'operator1',
        email: 'operator@quicktransit.com',
        password: 'operator123',
        role: 'operator'
      }
    ]);

    console.log('Users created');

    // Create sample routes
    const routes = await Route.create([
      {
        name: 'Route 58',
        from: 'CBD Nairobi',
        to: 'Eastleigh',
        distance: '8 km',
        fare: 50,
        assignedMatatus: []
      },
      {
        name: 'Route 33',
        from: 'CBD Nairobi',
        to: 'Westlands',
        distance: '6 km',
        fare: 40,
        assignedMatatus: []
      },
      {
        name: 'Route 46',
        from: 'CBD Nairobi',
        to: 'Langata',
        distance: '12 km',
        fare: 70,
        assignedMatatus: []
      },
      {
        name: 'Route 111',
        from: 'CBD Nairobi',
        to: 'Thika',
        distance: '45 km',
        fare: 150,
        assignedMatatus: []
      }
    ]);

    console.log('Routes created');

    // Create sample matatus
    const matatus = await Matatu.create([
      {
        plateNumber: 'KCA 123A',
        capacity: 33,
        status: 'active',
        assignedRouteId: routes[0]._id,
        owner: 'John Mwangi',
        model: 'Toyota HiAce',
        year: 2021
      },
      {
        plateNumber: 'KBZ 456B',
        capacity: 14,
        status: 'active',
        assignedRouteId: routes[1]._id,
        owner: 'Mary Wanjiku',
        model: 'Nissan Matatu',
        year: 2020
      },
      {
        plateNumber: 'KDA 789C',
        capacity: 33,
        status: 'maintenance',
        assignedRouteId: null,
        owner: 'Peter Ochieng',
        model: 'Isuzu NQR',
        year: 2019
      },
      {
        plateNumber: 'KCB 321D',
        capacity: 14,
        status: 'active',
        assignedRouteId: routes[2]._id,
        owner: 'Grace Akinyi',
        model: 'Toyota HiAce',
        year: 2022
      },
      {
        plateNumber: 'KDD 654E',
        capacity: 33,
        status: 'inactive',
        assignedRouteId: null,
        owner: 'James Kariuki',
        model: 'Isuzu NQR',
        year: 2018
      },
      {
        plateNumber: 'KBB 987F',
        capacity: 14,
        status: 'active',
        assignedRouteId: routes[0]._id,
        owner: 'Susan Njeri',
        model: 'Nissan Matatu',
        year: 2023
      }
    ]);

    console.log('Matatus created');

    // Update routes with assigned matatus
    await Route.findByIdAndUpdate(routes[0]._id, { assignedMatatus: [matatus[0]._id, matatus[5]._id] });
    await Route.findByIdAndUpdate(routes[1]._id, { assignedMatatus: [matatus[1]._id] });
    await Route.findByIdAndUpdate(routes[2]._id, { assignedMatatus: [matatus[3]._id] });

    // Create sample trips
    await Trip.create([
      {
        matatuId: matatus[0]._id,
        routeId: routes[0]._id,
        driver: 'David Kamau',
        conductor: 'Brian Otieno',
        date: today,
        departureTime: '06:30',
        arrivalTime: '07:15',
        passengerCount: 30
      },
      {
        matatuId: matatus[1]._id,
        routeId: routes[1]._id,
        driver: 'Samuel Njoroge',
        conductor: 'Kevin Ouma',
        date: today,
        departureTime: '07:00',
        arrivalTime: '07:35',
        passengerCount: 12
      },
      {
        matatuId: matatus[3]._id,
        routeId: routes[2]._id,
        driver: 'Daniel Mutua',
        conductor: 'Alex Wekesa',
        date: today,
        departureTime: '06:45',
        arrivalTime: '07:40',
        passengerCount: 14
      },
      {
        matatuId: matatus[5]._id,
        routeId: routes[0]._id,
        driver: 'Patrick Maina',
        conductor: 'Joseph Kiprop',
        date: today,
        departureTime: '08:00',
        arrivalTime: '08:50',
        passengerCount: 13
      },
      {
        matatuId: matatus[0]._id,
        routeId: routes[0]._id,
        driver: 'David Kamau',
        conductor: 'Brian Otieno',
        date: yesterday,
        departureTime: '06:30',
        arrivalTime: '07:20',
        passengerCount: 28
      },
      {
        matatuId: matatus[1]._id,
        routeId: routes[1]._id,
        driver: 'Samuel Njoroge',
        conductor: 'Kevin Ouma',
        date: yesterday,
        departureTime: '07:15',
        arrivalTime: '07:50',
        passengerCount: 14
      }
    ]);

    console.log('Trips created');

    // Create sample alerts
    await Alert.create([
      {
        matatuId: matatus[0]._id,
        type: 'overloading',
        severity: 'high',
        message: 'Passenger count exceeds capacity (36/33)',
        timestamp: `${today}T08:30:00`,
        status: 'new'
      },
      {
        matatuId: matatus[1]._id,
        type: 'speed',
        severity: 'medium',
        message: 'Speed limit exceeded on Uhuru Highway (85 km/h in 50 zone)',
        timestamp: `${today}T07:45:00`,
        status: 'acknowledged'
      },
      {
        matatuId: matatus[3]._id,
        type: 'off-route',
        severity: 'low',
        message: 'Deviated from assigned Route 46 near Kibera',
        timestamp: `${yesterday}T16:20:00`,
        status: 'resolved'
      },
      {
        matatuId: matatus[2]._id,
        type: 'maintenance',
        severity: 'critical',
        message: 'Brake system inspection overdue by 15 days',
        timestamp: `${yesterday}T09:00:00`,
        status: 'new'
      },
      {
        matatuId: matatus[5]._id,
        type: 'safety',
        severity: 'high',
        message: 'Missing fire extinguisher during inspection',
        timestamp: `${today}T10:00:00`,
        status: 'new'
      }
    ]);

    console.log('Alerts created');

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedData();
});
