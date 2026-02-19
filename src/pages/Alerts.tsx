import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Plus, CheckCircle, Clock, Eye } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Alert } from "@/types";

const severityColor: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning/15 text-warning",
  high: "bg-destructive/15 text-destructive",
  critical: "bg-destructive text-destructive-foreground",
};

const statusIcon: Record<string, React.ReactNode> = {
  new: <AlertTriangle className="h-4 w-4 text-destructive" />,
  acknowledged: <Eye className="h-4 w-4 text-warning" />,
  resolved: <CheckCircle className="h-4 w-4 text-success" />,
};

const Alerts = () => {
  const { data: alerts = [], isLoading: alertsLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: api.alerts.getAll,
  });

  const { data: matatus = [], isLoading: matatusLoading } = useQuery({
    queryKey: ['matatus'],
    queryFn: api.matatus.getAll,
  });

  const isLoading = alertsLoading || matatusLoading;

  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = statusFilter === "all" ? alerts : alerts.filter(a => a.status === statusFilter);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Alerts & Violations</h1>
            <p className="text-muted-foreground text-sm mt-1">Monitor safety and compliance alerts</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive"><Plus className="h-4 w-4 mr-2" />Create Alert</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Log New Alert</DialogTitle></DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Matatu</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select matatu" /></SelectTrigger>
                    <SelectContent>
                      {matatus.map(m => (
                        <SelectItem key={m.id} value={m.id}>{m.plateNumber}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overloading">Overloading</SelectItem>
                        <SelectItem value="off-route">Off-Route</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="speed">Speed</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Severity</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select severity" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe the violation..." />
                </div>
                <Button variant="destructive" className="mt-2" onClick={() => setOpen(false)}>Submit Alert</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-2">
          {["all", "new", "acknowledged", "resolved"].map(s => (
            <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(s)} className="capitalize">
              {s === "all" ? "All" : s}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((alert) => {
            const mat = matatus.find(m => m.id === alert.matatuId);
            return (
              <Card key={alert.id} className="border-0 shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">{statusIcon[alert.status]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold">{alert.message}</p>
                        <Badge className={severityColor[alert.severity]} variant="secondary">{alert.severity}</Badge>
                        <Badge variant="outline" className="capitalize">{alert.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {mat?.plateNumber} · {new Date(alert.timestamp).toLocaleString()} · Status: <span className="capitalize font-medium">{alert.status}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Alerts;
