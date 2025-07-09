import { AdvisorForm } from "@/components/forms/AdvisorForm";
import { Bot } from "lucide-react";

export default function AdvisorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-16 h-16 mb-4">
            <Bot className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold font-headline text-primary">AI Supplement Advisor</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Get personalized supplement recommendations based on your unique goals and lifestyle.
          </p>
        </div>
        <AdvisorForm />
      </div>
    </div>
  );
}
