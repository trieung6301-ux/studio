import Image from "next/image";
import type { Product } from "@/lib/placeholder-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarRating } from "./StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative w-full h-56">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={`${product.category} supplement`}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold font-headline mb-2">{product.name}</CardTitle>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">{product.brand}</CardDescription>
        <div className="flex items-center mt-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground ml-2">({product.reviews} đánh giá)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <Button>Thêm vào giỏ hàng</Button>
      </CardFooter>
    </Card>
  );
}
