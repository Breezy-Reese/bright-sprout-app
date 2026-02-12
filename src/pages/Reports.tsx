import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { trips, matatus, routes } from "@/data/mockData";
import { AppLayout } from "@/components/AppLayout";

const Reports = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [routeFilter, setRouteFilter] = useState("all");

  const filtered = trips.filter(trip => {
    if (dateFrom && trip.date < dateFrom) return false;
    if (dateTo && trip.date > dateTo) return false;
    if (routeFilter !== "all" && trip.routeId !== routeFilter) return false;
    return true;
  });

  const totalPassengers = filtered.reduce((sum, t) => sum + t.passengerCount, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Generate trip reports for SACCO and NTSA compliance</p>
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-4">
              <div className="grid gap-2">
                <Label className="text-xs">From</Label>
                <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="w-40" />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs">To</Label>
                <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="w-40" />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs">Route</Label>
                <Select value={routeFilter} onValueChange={setRouteFilter}>
                  <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Routes</SelectItem>
                    {routes.map(r => (
                      <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-5 text-center">
              <p className="text-sm text-muted-foreground">Total Trips</p>
              <p className="text-3xl font-bold">{filtered.length}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-5 text-center">
              <p className="text-sm text-muted-foreground">Total Passengers</p>
              <p className="text-3xl font-bold">{totalPassengers}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-5 text-center">
              <p className="text-sm text-muted-foreground">Avg Passengers/Trip</p>
              <p className="text-3xl font-bold">{filtered.length ? Math.round(totalPassengers / filtered.length) : 0}</p>
            </CardContent>
          </Card>
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
                  <TableHead>Passengers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(trip => {
                  const mat = matatus.find(m => m.id === trip.matatuId);
                  const route = routes.find(r => r.id === trip.routeId);
                  return (
                    <TableRow key={trip.id}>
                      <TableCell>{trip.date}</TableCell>
                      <TableCell className="font-medium">{mat?.plateNumber}</TableCell>
                      <TableCell>{route?.name}</TableCell>
                      <TableCell>{trip.driver}</TableCell>
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

export default Reports;
