"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { membershipPlans } from '@/lib/placeholder-data';
import { CheckCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

export function PricingTable() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const getPrice = (plan: typeof membershipPlans[0]) => {
    if (billingCycle === 'yearly') {
      // Apply a discount for yearly billing, e.g., 2 months free
      return (plan.price * 12 * 0.83).toFixed(0);
    }
    return plan.price.toFixed(0);
  };
  
  const getBilledText = () => {
    return billingCycle === 'monthly' ? 'Thanh toán hàng tháng' : 'Thanh toán hàng năm';
  }

  const yearlyPlans = membershipPlans.map(plan => ({...plan, period: 'yearly'}));
  const displayPlans = billingCycle === 'monthly' ? membershipPlans : yearlyPlans;

  return (
    <div className="max-w-5xl mx-auto">
       <div className="flex justify-center items-center gap-4 mb-10">
        <Label htmlFor="billing-switch" className={cn("font-medium", billingCycle === 'monthly' ? 'text-primary' : 'text-muted-foreground')}>
          Hàng tháng
        </Label>
        <Switch
          id="billing-switch"
          checked={billingCycle === 'yearly'}
          onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
        />
        <Label htmlFor="billing-switch" className={cn("font-medium", billingCycle === 'yearly' ? 'text-primary' : 'text-muted-foreground')}>
          Hàng năm (Tiết kiệm ~17%)
        </Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={cn(
              "flex flex-col rounded-xl overflow-hidden transition-all duration-300",
              plan.isPopular ? "border-primary border-2 shadow-lg -translate-y-2" : "border shadow-md"
            )}
          >
            <CardHeader className="p-6 bg-card">
              {plan.isPopular && (
                <Badge variant="secondary" className="w-fit self-center mb-2 bg-accent text-accent-foreground">Phổ biến nhất</Badge>
              )}
              <CardTitle className="text-2xl font-bold font-headline text-center">{plan.title}</CardTitle>
              <div className="text-center">
                 <span className="text-4xl font-extrabold">${getPrice(plan)}</span>
                 <span className="text-muted-foreground">/tháng</span>
              </div>
              <CardDescription className="text-center h-5">{plan.discount && billingCycle === plan.period ? plan.discount : ''}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <ul className="space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 mt-auto">
              <Button className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>
                Chọn gói
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <p className="text-center text-muted-foreground text-sm mt-8">
        *Giá gói hàng năm được hiển thị theo mức giá hiệu quả hàng tháng. Bạn sẽ bị tính phí cho cả năm cùng một lúc.
      </p>
    </div>
  );
}
