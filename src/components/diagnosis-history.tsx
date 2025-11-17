import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { diagnosisHistory } from "@/lib/placeholder-data";
import Image from "next/image";

export function DiagnosisHistory() {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                Image
              </TableHead>
              <TableHead>Disease</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {diagnosisHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Crop image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={item.imageUrl}
                    width="64"
                    data-ai-hint="crop leaf"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.diseaseName}</TableCell>
                <TableCell>
                  <Badge variant={item.severityLevel === "High" ? "destructive" : item.severityLevel === "Medium" ? "secondary" : "default"} className={item.severityLevel === 'Low' ? 'bg-primary/80 text-primary-foreground' : ''}>
                    {item.severityLevel}
                  </Badge>
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="text-right">
                  {(item.confidenceScore * 100).toFixed(0)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
