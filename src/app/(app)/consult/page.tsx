import { ConsultChat } from "@/components/consult-chat";

export default function ConsultPage() {
  return (
    <div>
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Consult an Expert</h2>
        <p className="text-muted-foreground">
          Get personalized advice from an agricultural expert.
        </p>
      </div>
      <ConsultChat />
    </div>
  );
}
