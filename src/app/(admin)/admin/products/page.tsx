'use client'

import { useState, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getProducts, Product } from '@/lib/api/products.api'
import { Edit, Trash2, Eye, Plus, Search, AlertCircle, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import AddProductForm from '@/components/forms/AddProductForm'

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const queryClient = useQueryClient()

  // Use React Query to fetch products
  const {
    data: productsData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  })

  const products = productsData?.products || []

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products
    
    return products.filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleEdit = (product: Product) => {
    console.log('Edit product:', product)
    // TODO: Implement edit functionality
    // After successful edit, invalidate the products query
    // queryClient.invalidateQueries({ queryKey: ['products'] })
  }

  const handleDelete = (product: Product) => {
    console.log('Delete product:', product)
    // TODO: Implement delete functionality
    // After successful delete, invalidate the products query
    // queryClient.invalidateQueries({ queryKey: ['products'] })
  }

  const handleView = (product: Product) => {
    console.log('View product:', product)
    // TODO: Implement view functionality
  }

  const handleRefresh = () => {
    refetch()
  }

  const handleAddProductSuccess = () => {
    // Invalidate and refetch products after successful creation
    queryClient.invalidateQueries({ queryKey: ['products'] })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Card>
          <CardContent>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading products...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Card>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load products. {error?.message || 'Please try again.'}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => refetch()}
                  className="ml-2"
                >
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Products Management</h1>
        <p className="text-gray-600">Manage your product catalog</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle>All Products ({filteredProducts.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={() => setIsAddProductOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No products found. Click "Add Product" to get started.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product: Product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage 
                            src={product.imageUrl} 
                            alt={product.name}
                          />
                          <AvatarFallback>
                            {product.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {product.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.type}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(product.price)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={product.deleted ? "destructive" : "default"}
                        >
                          {product.deleted ? "Deleted" : "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(product)}
                            title="View product"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(product)}
                            title="Edit product"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product)}
                            title="Delete product"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <AddProductForm
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onSuccess={handleAddProductSuccess}
      />
    </div>
  )
}
