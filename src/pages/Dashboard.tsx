import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Route, ClipboardList, AlertTriangle } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Matatu, Route as RouteType, Trip, Alert } from "@/types";

const severityColor: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning/15 text-warning",
  high: "bg-destructive/15 text-destructive",
  critical: "bg-destructive text-destructive-foreground",
};

const Dashboard = () => {
  const { data: matatus = [], isLoading: matatusLoading } = useQuery({
    queryKey: ['matatus'],
    queryFn: api.matatus.getAll,
  });

  const { data: routes = [], isLoading: routesLoading } = useQuery({
    queryKey: ['routes'],
    queryFn: api.routes.getAll,
  });

  const { data: trips = [], isLoading: tripsLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: api.trips.getAll,
  });

  const { data: alerts = [], isLoading: alertsLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: api.alerts.getAll,
  });

  const isLoading = matatusLoading || routesLoading || tripsLoading || alertsLoading;

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Loading...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const statCards = [
    { title: "Total Matatus", value: matatus.length, icon: Bus, color: "text-primary" },
    { title: "Active Routes", value: routes.length, icon: Route, color: "text-accent" },
    { title: "Today's Trips", value: trips.filter(t => t.date === today).length, icon: ClipboardList, color: "text-success" },
    { title: "Active Alerts", value: alerts.filter(a => a.status !== "resolved").length, icon: AlertTriangle, color: "text-destructive" },
  ];

  const recentAlerts = alerts.slice(0, 4);
  const recentTrips = trips.filter(t => t.date === today);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Overview of your fleet operations</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <Card key={card.title} className="border-0 shadow-md">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`h-11 w-11 rounded-xl bg-muted flex items-center justify-center ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAlerts.map((alert) => {
                const mat = matatus.find(m => m._id === alert.matatuId);
                return (
                  <div key={alert._id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{mat?.plateNumber} · {new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                    <Badge className={severityColor[alert.severity]} variant="secondary">{alert.severity}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Today's Trips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTrips.map((trip) => {
                const mat = matatus.find(m => m._id === trip.matatuId);
                const route = routes.find(r => r._id === trip.routeId);
                return (
                  <div key={trip._id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Bus className="h-4 w-4 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{mat?.plateNumber} — {route?.name}</p>
                      <p className="text-xs text-muted-foreground">{trip.driver} · {trip.departureTime}–{trip.arrivalTime} · {trip.passengerCount} pax</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
