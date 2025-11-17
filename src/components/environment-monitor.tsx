"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart";
import { environmentData } from "@/lib/placeholder-data";

const chartConfig = {
  temperature: {
    label: "Temp (°C)",
    color: "hsl(var(--chart-1))",
  },
  humidity: {
    label: "Humidity (%)",
    color: "hsl(var(--chart-2))",
  },
  soilMoisture: {
    label: "Soil Moisture",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function EnvironmentMonitor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Last 24 Hours</CardTitle>
        <CardDescription>Temperature, Humidity, Soil Moisture</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={environmentData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="temperature"
              type="natural"
              stroke="var(--color-temperature)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="humidity"
              type="natural"
              stroke="var(--color-humidity)"
              strokeWidth={2}
              dot={false}
            />
             <Line
              dataKey="soilMoisture"
              type="natural"
              stroke="var(--color-soilMoisture)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
