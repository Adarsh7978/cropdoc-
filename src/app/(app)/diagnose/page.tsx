
import { DiagnosisForm } from "@/components/diagnosis-form";

export default function DiagnosePage() {
  return (
    <div>
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Detailed Diagnosis</h2>
        <p className="text-muted-foreground">
          Upload an image and provide details for the most accurate AI-powered diagnosis and treatment plan.
        </p>
      </div>
      <DiagnosisForm />
    </div>
  );
}

    