"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ProductCard } from "@/components/shared/ProductCard";
import { products, categories, brands } from "@/lib/placeholder-data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const bannerImages = [
  { src: "https://placehold.co/1200x500.png", alt: "Lớp học Yoga", hint: "yoga class" },
  { src: "https://placehold.co/1200x500.png", alt: "Nâng tạ", hint: "weightlifting gym" },
  { src: "https://placehold.co/1200x500.png", alt: "Buổi tập Cardio", hint: "cardio workout" },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([100]);
  const [sortBy, setSortBy] = useState("rating");

  const maxPrice = useMemo(() => Math.max(...products.map((p) => p.price)), []);

  const filteredProducts = useMemo(() => {
    let tempProducts = products;

    if (searchTerm) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }

    if (brand !== "all") {
      tempProducts = tempProducts.filter((product) => product.brand === brand);
    }
    
    tempProducts = tempProducts.filter(
      (product) => product.price <= priceRange[0]
    );

    switch (sortBy) {
      case "rating":
        tempProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        tempProducts.sort((a, b) => b.price - a.price);
        break;
    }

    return tempProducts;
  }, [searchTerm, category, brand, priceRange, sortBy]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {bannerImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="relative flex aspect-[16/7] items-center justify-center p-0 overflow-hidden rounded-lg">
                       <Image 
                        src={image.src} 
                        alt={image.alt} 
                        fill
                        className="object-cover"
                        data-ai-hint={image.hint}
                       />
                       <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 font-headline">
                            {index === 0 && "Tìm lại sự cân bằng: Tham gia lớp Yoga của chúng tôi"}
                            {index === 1 && "Giải phóng sức mạnh của bạn"}
                            {index === 2 && "Tăng cường Cardio của bạn"}
                          </h2>
                          <p className="text-lg md:text-xl text-white/90">
                            {index === 0 && "Các lớp học linh hoạt cho mọi cấp độ."}
                            {index === 1 && "Cơ sở vật chất cử tạ hiện đại."}
                            {index === 2 && "Hãy để trái tim bạn đập rộn ràng với các máy tập cardio của chúng tôi."}
                          </p>
                       </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
        </Carousel>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 bg-card p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-6 font-headline">Bộ lọc</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="search" className="text-lg font-semibold">Tìm kiếm</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Tìm kiếm thực phẩm bổ sung..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category" className="text-lg font-semibold">Danh mục</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="mt-2">
                  <SelectValue placeholder="Tất cả danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="brand" className="text-lg font-semibold">Thương hiệu</Label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger id="brand" className="mt-2">
                  <SelectValue placeholder="Tất cả thương hiệu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả thương hiệu</SelectItem>
                  {brands.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price" className="text-lg font-semibold">Giá tối đa: ${priceRange[0]}</Label>
              <Slider
                id="price"
                min={0}
                max={maxPrice}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-3"
              />
            </div>

            <div>
              <Label htmlFor="sort" className="text-lg font-semibold">Sắp xếp theo</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="mt-2">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Đánh giá tốt nhất</SelectItem>
                  <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                  <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="sm:col-span-2 xl:col-span-3 text-center py-12">
                <p className="text-muted-foreground text-lg">Không có sản phẩm nào phù hợp với tiêu chí của bạn.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
