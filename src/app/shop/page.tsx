import { ProductCard } from "@/components/shared/ProductCard";
import { products } from "@/lib/placeholder-data";
import { ShoppingBag } from "lucide-react";

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-16 h-16 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold font-headline text-primary">
          Cửa hàng
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Duyệt qua lựa chọn cao cấp của chúng tôi về các loại thực phẩm chức năng và dụng cụ tập gym.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
