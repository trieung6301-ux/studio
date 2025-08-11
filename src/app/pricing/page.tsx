import { PricingTable } from '@/components/pricing/PricingTable';
import { DollarSign } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
         <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-16 h-16 mb-4">
          <DollarSign className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold font-headline text-primary">
          Membership Plans
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose the perfect plan to kickstart your fitness journey. All plans include full access to our facilities.
        </p>
      </div>
      <PricingTable />
    </div>
  );
}
