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
          Các gói thành viên
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Chọn gói hoàn hảo để bắt đầu hành trình thể chất của bạn. Tất cả các gói đều bao gồm quyền truy cập đầy đủ vào các cơ sở của chúng tôi.
        </p>
      </div>
      <PricingTable />
    </div>
  );
}
