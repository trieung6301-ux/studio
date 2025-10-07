'use client'

import { useState, useEffect, useMemo } from 'react'
import { ProductCard } from '@/components/shared/ProductCard'
import { ShoppingBag } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { getProducts, type Product } from '@/lib/api/products.api'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [priceValue, setPriceValue] = useState<[number]>([0])
  
  // Lấy danh sách các loại sản phẩm duy nhất
  const productTypes = useMemo(() => {
    if (!products.length) return []
    return [...new Set(products.map(p => p.type))]
  }, [products])
  
  // Tính toán khoảng giá
  const priceRange = useMemo(() => {
    if (!products.length) return [0, 1000000]
    const prices = products.map(p => p.price)
    return [Math.min(...prices), Math.max(...prices)]
  }, [products])
  
  // Lấy dữ liệu sản phẩm từ API khi component được tải
  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true)
        const result = await getProducts()
        setProducts(result.products)
        setFilteredProducts(result.products)
        
        // Cập nhật giá trị mặc định cho bộ lọc giá
        if (result.products.length > 0) {
          const prices = result.products.map(p => p.price)
          const maxPrice = Math.max(...prices)
          setPriceValue([maxPrice])
        }
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', err)
        setError('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  const handleFilterChange = () => {
    let tempProducts = [...products]

    if (selectedType !== 'all') {
      tempProducts = tempProducts.filter(p => p.type === selectedType)
    }

    tempProducts = tempProducts.filter(p => p.price <= priceValue[0])

    setFilteredProducts(tempProducts)
  }

  const handleApplyFilters = () => {
    handleFilterChange()
  }

  const handleResetFilters = () => {
    setSelectedType('all')
    setPriceValue([priceRange[1]])
    setFilteredProducts(products)
  }

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
          Duyệt qua lựa chọn cao cấp của chúng tôi về các loại thực phẩm chức
          năng và dụng cụ tập gym.
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
                  <Select
                    value={selectedType}
                    onValueChange={setSelectedType}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả loại</SelectItem>
                      {productTypes.map((type) => (
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
                  <Button
                    onClick={handleResetFilters}
                    variant="outline"
                  >
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
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} sản phẩm
            </div>
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
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag className="h-12 w-12 mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Không tìm thấy sản phẩm</h3>
              <p className="text-muted-foreground">
                Hãy điều chỉnh bộ lọc để tìm thấy sản phẩm bạn đang tìm kiếm.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
