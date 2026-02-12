import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { routes, matatus } from "@/data/mockData";
import { AppLayout } from "@/components/AppLayout";
import { Bus, MapPin } from "lucide-react";

const Routes = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Route Management</h1>
          <p className="text-muted-foreground text-sm mt-1">View and manage all active routes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes.map((route) => {
            const assigned = matatus.filter(m => route.assignedMatatus.includes(m.id));
            return (
              <Card key={route.id} className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{route.name}</CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">{assigned.length} matatu{assigned.length !== 1 ? "s" : ""}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{route.from} → {route.to}</span>
                    <span className="ml-auto">{route.distance}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Fare: </span>
                    <span className="font-semibold">KES {route.fare}</span>
                  </div>
                  {assigned.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {assigned.map(m => (
                        <div key={m.id} className="flex items-center gap-1.5 text-xs bg-muted px-2 py-1 rounded-md">
                          <Bus className="h-3 w-3" />
                          {m.plateNumber}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Routes;
