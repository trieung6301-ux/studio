'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { membershipPlans } from '@/lib/placeholder-data'
import { CheckCircle, Zap } from 'lucide-react'
import { Badge } from '../ui/badge'

export function PricingTable() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly',
  )

  const getPriceForPlan = (
    plan: (typeof membershipPlans)[0],
    cycle: 'monthly' | 'yearly',
  ) => {
    if (cycle === 'yearly') {
      const yearlyPlan = membershipPlans.find(
        (p) => p.id === `${plan.id.split('-')[0]}-yearly`,
      )
      return yearlyPlan ? yearlyPlan.price : plan.price * 12 * 0.8
    }
    const monthlyPlan = membershipPlans.find(
      (p) => p.id === `${plan.id.split('-')[0]}-monthly`,
    )
    return monthlyPlan ? monthlyPlan.price : plan.price
  }

  const plansToShow = membershipPlans.filter((p) => p.period === 'monthly')

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-center items-center gap-4 mb-10">
        <Label
          htmlFor="billing-switch"
          className={cn(
            'font-medium text-lg',
            billingCycle === 'monthly'
              ? 'text-primary'
              : 'text-muted-foreground',
          )}
        >
          Hàng tháng
        </Label>
        <Switch
          id="billing-switch"
          checked={billingCycle === 'yearly'}
          onCheckedChange={(checked) =>
            setBillingCycle(checked ? 'yearly' : 'monthly')
          }
          aria-label="Chuyển đổi thanh toán hàng tháng và hàng năm"
        />
        <Label
          htmlFor="billing-switch"
          className={cn(
            'font-medium text-lg',
            billingCycle === 'yearly'
              ? 'text-primary'
              : 'text-muted-foreground',
          )}
        >
          Hàng năm
        </Label>
        <Badge variant="destructive" className="animate-pulse">
          -20%
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plansToShow.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              'flex flex-col rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2',
              plan.isPopular
                ? 'border-primary border-2 ring-4 ring-primary/20'
                : 'border',
            )}
          >
            <CardHeader className="p-6 bg-card text-center">
              {plan.isPopular && (
                <Badge
                  variant="secondary"
                  className="w-fit self-center mb-4 bg-accent text-accent-foreground font-bold py-1 px-3 rounded-full"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Phổ biến nhất
                </Badge>
              )}
              <CardTitle className="text-3xl font-bold font-headline">
                {plan.title}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground pt-1">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 flex-grow">
              <div className="text-center mb-6">
                <span className="text-5xl font-extrabold font-headline tracking-tighter">
                  {(
                    getPriceForPlan(plan, billingCycle) /
                    (billingCycle === 'yearly' ? 12 : 1)
                  ).toLocaleString('vi-VN')}
                  ₫
                </span>
                <span className="text-muted-foreground text-lg">/tháng</span>
                {billingCycle === 'yearly' && (
                  <p className="text-sm text-green-600 font-semibold">
                    Thanh toán hàng năm
                  </p>
                )}
              </div>
              <ul className="space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 mt-auto bg-secondary/30">
              <Button
                className="w-full text-lg py-6"
                variant={plan.isPopular ? 'default' : 'outline'}
              >
                Chọn gói
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <p className="text-center text-muted-foreground text-sm mt-8">
        *Giá gói hàng năm được hiển thị theo mức giá hiệu quả hàng tháng. Bạn sẽ
        bị tính phí cho cả năm cùng một lúc.
      </p>
    </div>
  )
}
