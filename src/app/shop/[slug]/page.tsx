'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ShoppingCart, Star, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'
import { useToast } from '@/hooks/use-toast'
import { getProductById, type Product } from '@/lib/api/products.api'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true)
        const productData = await getProductById(productId)
        setProduct(productData)
      } catch (err) {
        console.error('Lỗi khi lấy thông tin sản phẩm:', err)
        setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.')
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      toast({
        title: 'Đã thêm vào giỏ hàng',
        description: `${product.name} (${quantity} sản phẩm) đã được thêm vào giỏ hàng của bạn.`,
      })
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <ShoppingBag className="h-12 w-12 mb-4 text-destructive" />
          <h3 className="text-lg font-medium">Lỗi</h3>
          <p className="text-muted-foreground">
            {error || 'Không tìm thấy sản phẩm'}
          </p>
          <Button asChild className="mt-4">
            <Link href="/shop">Quay lại cửa hàng</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button variant="ghost" asChild className="flex items-center gap-2">
          <Link href="/shop">
            <ArrowLeft className="h-4 w-4" />
            Quay lại cửa hàng
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Hình ảnh sản phẩm */}
        <div className="relative overflow-hidden rounded-xl bg-muted aspect-square">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground">Không có hình ảnh</span>
            </div>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col">
          <div className="mb-4">
            <Badge variant="outline" className="mb-2">
              {product.type}
            </Badge>
            <h1 className="text-3xl font-bold font-headline">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                (120 đánh giá)
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold mb-6">
            {product.price.toLocaleString('vi-VN')}₫
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10 rounded-none"
              >
                -
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
                className="h-10 w-10 rounded-none"
              >
                +
              </Button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="flex-1 gap-2"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5" />
              Thêm vào giỏ hàng
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Tình trạng</span>
              <span className="font-medium">Còn hàng</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Danh mục</span>
              <span className="font-medium">{product.type}</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="description">Mô tả</TabsTrigger>
          <TabsTrigger value="specifications">Thông số</TabsTrigger>
          <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Chi tiết sản phẩm</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {product.description}
                {'\n\n'}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Thông số kỹ thuật</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Khối lượng
                  </span>
                  <span className="font-medium">500g</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Xuất xứ
                  </span>
                  <span className="font-medium">Mỹ</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Thương hiệu
                  </span>
                  <span className="font-medium">Optimum Nutrition</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Hạn sử dụng
                  </span>
                  <span className="font-medium">24 tháng</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Đánh giá từ khách hàng</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium">NV</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Nguyễn Văn A</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-3 w-3 fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">
                      Sản phẩm rất tốt, đóng gói cẩn thận, giao hàng nhanh.
                      Mình đã dùng được 1 tháng và thấy hiệu quả rõ rệt.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium">TH</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Trần Hùng</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-3 w-3 fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">
                      Chất lượng sản phẩm tuyệt vời, giá cả hợp lý. Sẽ mua lại
                      lần sau.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Placeholder cho sản phẩm liên quan */}
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="group overflow-hidden rounded-xl">
              <div className="relative w-full h-48 overflow-hidden bg-muted">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground">Sản phẩm liên quan</span>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  {product.type}
                </Badge>
                <h3 className="font-medium">Sản phẩm liên quan {item}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  Mô tả ngắn về sản phẩm liên quan
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="font-semibold">
                    {(product.price * 0.8).toLocaleString('vi-VN')}₫
                  </div>
                  <Button size="sm" variant="outline">
                    Xem chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}