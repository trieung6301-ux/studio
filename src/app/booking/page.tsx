import { ptData } from "@/lib/placeholder-data";
import { PTCard } from "@/components/booking/PTCard";
import { CalendarCheck } from "lucide-react";

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-16 h-16 mb-4">
          <CalendarCheck className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold font-headline text-primary">
          Book a Personal Trainer
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Find the perfect trainer to help you achieve your fitness goals. Browse our elite trainers and book your session or monthly package today.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ptData.map((pt) => (
          <PTCard key={pt.id} pt={pt} />
        ))}
      </div>
    </div>
  );
}
