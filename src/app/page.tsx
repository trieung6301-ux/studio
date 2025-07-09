"use client";

import { useState, useMemo } from "react";
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
      <section className="text-center py-12 bg-card rounded-lg shadow-lg mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Fuel Your Ambition
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          Discover top-tier supplements to crush your fitness goals. Quality you can trust, results you can see.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 bg-card p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-6 font-headline">Filters</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="search" className="text-lg font-semibold">Search</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search supplements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category" className="text-lg font-semibold">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="mt-2">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="brand" className="text-lg font-semibold">Brand</Label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger id="brand" className="mt-2">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price" className="text-lg font-semibold">Max Price: ${priceRange[0]}</Label>
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
              <Label htmlFor="sort" className="text-lg font-semibold">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="mt-2">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Best Rating</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
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
                <p className="text-muted-foreground text-lg">No products match your criteria.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
