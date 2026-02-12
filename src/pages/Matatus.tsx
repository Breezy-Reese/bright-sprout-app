import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { matatus as initialMatatus, routes } from "@/data/mockData";
import { AppLayout } from "@/components/AppLayout";
import type { Matatu } from "@/types";

const statusColor: Record<string, string> = {
  active: "bg-success/15 text-success",
  maintenance: "bg-warning/15 text-warning",
  inactive: "bg-muted text-muted-foreground",
};

const Matatus = () => {
  const [data] = useState<Matatu[]>(initialMatatus);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = data.filter(m =>
    m.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
    m.owner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Matatu Registry</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage all registered matatus</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />Add Matatu</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Matatu</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Plate Number</Label>
                  <Input placeholder="e.g. KCA 123A" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Model</Label>
                    <Input placeholder="e.g. Toyota HiAce" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Year</Label>
                    <Input type="number" placeholder="2024" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Capacity</Label>
                    <Input type="number" placeholder="33" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Owner</Label>
                    <Input placeholder="Owner name" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Assigned Route</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select route" /></SelectTrigger>
                    <SelectContent>
                      {routes.map(r => (
                        <SelectItem key={r.id} value={r.id}>{r.name} ({r.from} → {r.to})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="mt-2" onClick={() => setOpen(false)}>Register Matatu</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search by plate or owner..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plate Number</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(m => {
                  const route = routes.find(r => r.id === m.assignedRouteId);
                  return (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.plateNumber}</TableCell>
                      <TableCell>{m.model} ({m.year})</TableCell>
                      <TableCell>{m.capacity}</TableCell>
                      <TableCell>{m.owner}</TableCell>
                      <TableCell>{route ? route.name : "—"}</TableCell>
                      <TableCell><Badge className={statusColor[m.status]} variant="secondary">{m.status}</Badge></TableCell>
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

export default Matatus;
