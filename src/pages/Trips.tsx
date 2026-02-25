import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

const Trips = () => {
  const queryClient = useQueryClient();

  const { data: trips = [], isLoading: tripsLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: api.trips.getAll,
  });

  const { data: matatus = [], isLoading: matatusLoading } = useQuery({
    queryKey: ['matatus'],
    queryFn: api.matatus.getAll,
  });

  const { data: routes = [], isLoading: routesLoading } = useQuery({
    queryKey: ['routes'],
    queryFn: api.routes.getAll,
  });

  const isLoading = tripsLoading || matatusLoading || routesLoading;

  const [open, setOpen] = useState(false);

  // form state
  const [selectedMatatu, setSelectedMatatu] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [driver, setDriver] = useState("");
  const [conductor, setConductor] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [passengerCount, setPassengerCount] = useState<number | ''>("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [creating, setCreating] = useState(false);

  const resetForm = () => {
    setSelectedMatatu(null);
    setSelectedRoute(null);
    setDriver("");
    setConductor("");
    setDepartureTime("");
    setArrivalTime("");
    setPassengerCount("");
    setDate(new Date().toISOString().slice(0,10));
  };

  const handleCreate = async () => {
    if (!selectedMatatu || !selectedRoute) return;
    setCreating(true);
    try {
      await api.trips.create({
        matatuId: selectedMatatu,
        routeId: selectedRoute,
        driver,
        conductor,
        date,
        departureTime,
        arrivalTime,
        passengerCount: Number(passengerCount) || 0,
      });
      await queryClient.invalidateQueries(['trips']);
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error('failed to log trip', err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Trip Log</h1>
            <p className="text-muted-foreground text-sm mt-1">Daily trip records for all matatus</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />Log New Trip</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Log New Trip</DialogTitle></DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Matatu</Label>
                  <Select
                    value={selectedMatatu || ""}
                    onValueChange={val => setSelectedMatatu(val || null)}
                  >
                    <SelectTrigger><SelectValue placeholder="Select matatu" /></SelectTrigger>
                    <SelectContent>
                      {matatus.filter(m => m.status === "active").map(m => (
                        <SelectItem key={m.id} value={m.id}>{m.plateNumber}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Route</Label>
                  <Select
                    value={selectedRoute || ""}
                    onValueChange={val => setSelectedRoute(val || null)}
                  >
                    <SelectTrigger><SelectValue placeholder="Select route" /></SelectTrigger>
                    <SelectContent>
                      {routes.map(r => (
                        <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Driver</Label>
                    <Input value={driver} onChange={e => setDriver(e.target.value)} placeholder="Driver name" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Conductor</Label>
                    <Input value={conductor} onChange={e => setConductor(e.target.value)} placeholder="Conductor name" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label>Departure</Label>
                    <Input type="time" value={departureTime} onChange={e => setDepartureTime(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Arrival</Label>
                    <Input type="time" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Passengers</Label>
                    <Input type="number" placeholder="0" value={passengerCount} onChange={e => setPassengerCount(Number(e.target.value) || "")} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Date</Label>
                  <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <Button className="mt-2" onClick={handleCreate} disabled={creating}>
                  {creating ? 'Logging…' : 'Submit Trip'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Matatu</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Conductor</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Passengers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trips.map(trip => {
                  const mat = matatus.find(m => m.id === trip.matatuId);
                  const route = routes.find(r => r.id === trip.routeId);
                  return (
                    <TableRow key={trip.id}>
                      <TableCell>{trip.date}</TableCell>
                      <TableCell className="font-medium">{mat?.plateNumber}</TableCell>
                      <TableCell>{route?.name}</TableCell>
                      <TableCell>{trip.driver}</TableCell>
                      <TableCell>{trip.conductor}</TableCell>
                      <TableCell>{trip.departureTime}–{trip.arrivalTime}</TableCell>
                      <TableCell>{trip.passengerCount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Trips;
