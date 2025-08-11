
"use client";

import { useState } from "react";
import { ProductCard } from "@/components/shared/ProductCard";
import { products, categories, brands } from "@/lib/placeholder-data";
import { ShoppingBag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");

  const handleFilterChange = () => {
    let tempProducts = products;
    if (selectedCategory !== "all") {
      tempProducts = tempProducts.filter(
        (p) => p.category === selectedCategory
      );
    }
    if (selectedBrand !== "all") {
      tempProducts = tempProducts.filter((p) => p.brand === selectedBrand);
    }
    setFilteredProducts(tempProducts);
  };
  
  const handleApplyFilters = () => {
    handleFilterChange();
  };
  
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setFilteredProducts(products);
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
          Duyệt qua lựa chọn cao cấp của chúng tôi về các loại thực phẩm chức năng và dụng cụ tập gym.
        </p>
      </div>

      <Card className="mb-8 p-6 shadow-lg">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn thương hiệu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả thương hiệu</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                 <Button onClick={handleApplyFilters} className="w-full">Áp dụng bộ lọc</Button>
                 <Button onClick={handleResetFilters} variant="outline" className="w-full">Đặt lại</Button>
              </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
       {filteredProducts.length === 0 && (
        <div className="text-center col-span-full py-12">
            <p className="text-xl text-muted-foreground">Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn.</p>
        </div>
      )}
    </div>
  );
}
