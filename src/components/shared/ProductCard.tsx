import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/api/products.api'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { useToast } from '@/hooks/use-toast'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: 'Đã thêm vào giỏ hàng',
      description: `${product.name} đã được thêm vào giỏ hàng của bạn.`,
    })
  }

  return (
    <Card className="group overflow-hidden rounded-xl">
      <Link
        href={`/shop/${product.id}`}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <CardHeader className="p-0">
          <div className="relative w-full h-56 overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">Không có hình ảnh</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="px-2 py-1 font-normal">
              {product.type}
            </Badge>
          </div>
          <CardTitle className="text-base font-medium">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2 text-xs mt-1">
            {product.description}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-semibold">{product.price.toLocaleString('vi-VN')}₫</div>
        <Button size="sm" className="h-8 rounded-lg" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  )
}
