

# QuickTransit – Public Transport Management System (Frontend)

A React-based frontend for managing matatu operations, monitoring routes, and tracking trip data for SACCO compliance. Built with mock data, ready to connect to your external backend.

---

## 1. Dashboard Overview
- Summary cards showing: total matatus, active routes, today's trips, active alerts
- Recent activity feed (latest trips, alerts, violations)
- Quick-access navigation to all modules

## 2. Matatu & Route Management
- **Matatu Registry**: List of all registered matatus with details (plate number, capacity, status, assigned route)
- **Add/Edit Matatu**: Form to register new matatus or update existing ones
- **Route Management**: List of routes with assigned matatus
- **Assign Matatu to Route**: Interface to link matatus to specific routes

## 3. Trip Logging & Reports
- **Daily Trip Log**: Table of trip records with crew info (driver + conductor), route, date/time, passenger count
- **Log New Trip**: Form for crew to submit daily trip reports
- **Reports Page**: Generate reports for SACCO managers and NTSA with filters (date range, route, matatu)
- Exportable report summaries (table view)

## 4. Alerts & Violations
- **Alerts Dashboard**: List of active alerts for overloading, off-route driving, and safety violations
- **Alert Details**: View individual alert with matatu info, violation type, timestamp
- **Create Alert**: Form to manually log a violation/alert
- Alert status tracking (new, acknowledged, resolved)

## 5. Navigation & Layout
- Sidebar navigation with icons for Dashboard, Matatus, Routes, Trips, Reports, Alerts
- Responsive layout for desktop and tablet
- Clean, professional design with consistent color scheme

## 6. Mock Data Layer
- All features will use realistic sample data stored in local TypeScript files
- Data structured to match typical API response formats, making it easy to swap in real API calls later
- Separate mock data files for matatus, routes, trips, alerts

