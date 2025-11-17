import { EnvironmentMonitor } from "@/components/environment-monitor";
import { DiagnosisHistory } from "@/components/diagnosis-history";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BellRing, FileText, Activity, Droplets } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Welcome back, John!</h2>
          <p className="text-muted-foreground">Here's an overview of your farm's health.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/diagnose">
            <Button>New Diagnosis</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Diagnoses</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Plants</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Based on recent diagnoses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Humidity</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <BellRing className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Potential blight risk</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold mb-4 font-headline">Diagnosis History</h3>
          <DiagnosisHistory />
        </div>
        <div className="space-y-8">
           <div>
              <h3 className="text-xl font-bold mb-4 font-headline">Proactive Alerts</h3>
                <Alert>
                  <BellRing className="h-4 w-4" />
                  <AlertTitle>High Blight Risk!</AlertTitle>
                  <AlertDescription>
                    The current humidity is ideal for Late Blight. Consider applying preventative fungicide.
                  </AlertDescription>
                </Alert>
           </div>
           <div>
              <h3 className="text-xl font-bold mb-4 font-headline">Environment Monitor</h3>
              <EnvironmentMonitor />
           </div>
        </div>
      </div>
    </div>
  );
}
