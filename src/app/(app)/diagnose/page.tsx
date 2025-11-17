import { DiagnosisForm } from "@/components/diagnosis-form";

export default function DiagnosePage() {
  return (
    <div>
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Diagnose Crop Disease</h2>
        <p className="text-muted-foreground">
          Upload a clear image of the affected crop to get an AI-powered diagnosis and treatment plan.
        </p>
      </div>
      <DiagnosisForm />
    </div>
  );
}
