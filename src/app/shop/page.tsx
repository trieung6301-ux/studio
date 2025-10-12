'use client'

import { ShoppingBag } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '@/components/shared/ProductCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { getProducts } from '@/lib/api/products.api'
import { useQuery } from '@tanstack/react-query'

export default function ShopPage() {
  const [selectedType, setSelectedType] = useState<string | undefined>()
  const [priceValue, setPriceValue] = useState<[number]>([0])

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts({ type: selectedType }),
  })

  const priceRange = useMemo(() => {
    if (!products?.products.length) return [0, 1000000]
    const prices = products.products.map((p) => p.price)
    return [Math.min(...prices), Math.max(...prices)]
  }, [products])

  // Lấy danh sách các loại sản phẩm duy nhất
  const productTypes = useMemo(() => {
    if (!products?.products.length) return []
    return [...new Set(products.products.map((p) => p.type))]
  }, [products])

  const handleApplyFilters = () => {
    refetch()
  }

  const handleResetFilters = () => {
    setSelectedType(undefined)
    setPriceValue([0])
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-16 h-16 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold font-headline text-primary">Cửa hàng</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Duyệt qua lựa chọn cao cấp của chúng tôi về các loại thực phẩm chức năng và dụng cụ tập
          gym.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with filters */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Bộ lọc</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="type" className="block mb-2">
                    Loại sản phẩm
                  </Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả loại</SelectItem>
                      {productTypes?.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price" className="block mb-2">
                    Giá tối đa: {priceValue[0].toLocaleString('vi-VN')}₫
                  </Label>
                  <Slider
                    id="price"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    step={50000}
                    value={priceValue}
                    onValueChange={(value) => setPriceValue([value[0]])}
                    className="mt-2"
                  />
                </div>

                <div className="flex flex-col space-y-2 pt-2">
                  <Button onClick={handleApplyFilters}>Áp dụng bộ lọc</Button>
                  <Button onClick={handleResetFilters} variant="outline">
                    Đặt lại
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Cửa hàng</h1>
            <div className="text-sm text-muted-foreground">{products?.total} sản phẩm</div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Đang tải sản phẩm...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag className="h-12 w-12 mb-4 text-destructive" />
              <h3 className="text-lg font-medium">Lỗi</h3>
              <p className="text-muted-foreground">{error.message}</p>
            </div>
          ) : products?.total === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag className="h-12 w-12 mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Không tìm thấy sản phẩm</h3>
              <p className="text-muted-foreground">
                Hãy điều chỉnh bộ lọc để tìm thấy sản phẩm bạn đang tìm kiếm.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
