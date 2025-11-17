import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Microscope, RotateCcw } from "lucide-react";
import type { DiagnoseCropDiseaseOutput } from "@/ai/flows/diagnose-crop-disease";
import type { RecommendTreatmentOutput } from "@/ai/flows/recommend-treatment";
import { Progress } from "@/components/ui/progress";


interface DiagnosisResultProps {
    result: {
        diagnosis: DiagnoseCropDiseaseOutput;
        treatment: RecommendTreatmentOutput;
    };
    imagePreview: string;
    onReset: () => void;
}

export function DiagnosisResult({ result, imagePreview, onReset }: DiagnosisResultProps) {
  const { diagnosis, treatment } = result;

  const getSeverityVariant = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const confidencePercent = Math.round(diagnosis.confidenceScore * 100);

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold font-headline">Diagnosis Complete</h3>
            <Button variant="outline" onClick={onReset}><RotateCcw className="mr-2 h-4 w-4" /> New Diagnosis</Button>
        </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1 space-y-6">
             <Card>
              <CardContent className="p-0">
                 <Image
                    src={imagePreview}
                    alt="Analyzed crop"
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover rounded-t-lg"
                 />
              </CardContent>
             </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Microscope className="text-primary"/> Diagnosis Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Disease Name</span>
                        <span className="font-semibold">{diagnosis.diseaseName}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Severity Level</span>
                        <Badge variant={getSeverityVariant(diagnosis.severityLevel)} className={diagnosis.severityLevel.toLowerCase() === 'low' ? 'bg-primary/80 text-primary-foreground' : ''}>
                            {diagnosis.severityLevel}
                        </Badge>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Confidence</span>
                            <span className="font-semibold">{confidencePercent}%</span>
                        </div>
                        <Progress value={confidencePercent} />
                    </div>
                </CardContent>
             </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Zap className="text-primary"/> Recommended Treatment</CardTitle>
              <CardDescription>Based on diagnosis, crop type, and environmental factors.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{treatment.treatmentRecommendations}</p>
            </CardContent>
          </Card>

          <Card className="bg-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="text-accent"/> Preventative Actions</CardTitle>
                 <CardDescription>Steps to protect your other crops and prevent future outbreaks.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{treatment.preventativeActions}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
