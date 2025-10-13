'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { updateProduct, CreateProductData, Product } from '@/lib/api/products.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Loader2, Upload } from 'lucide-react'

// Form validation schema
const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  type: z.string().min(1, 'Product type is required'),
  price: z.coerce.number().min(0, 'Price must be positive').max(999999999, 'Price is too high'),
  image: z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

interface EditProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  product: Product | null
}

export default function EditProductForm({ open, onOpenChange, onSuccess, product }: EditProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      type: '',
      price: 0,
      image: '',
    },
  })

  // Update form values when product changes
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        type: product.type,
        price: product.price,
        image: product.imageUrl,
      })
      setImagePreview(product.imageUrl)
      setSelectedFile(null) // Reset selected file
    }
  }, [product, form])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        form.setValue('image', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    if (!product) return

    try {
      setIsSubmitting(true)
      
      // Transform form data to API format
      const productData: CreateProductData = {
        product_name: data.name,
        product_desc: data.description,
        product_type: data.type,
        product_price: data.price,
        product_image: selectedFile || undefined,
      }
      
      // Update product via API
      await updateProduct(product.id, productData)
      
      // Reset form and close dialog
      form.reset()
      setImagePreview(null)
      setSelectedFile(null)
      onOpenChange(false)
      onSuccess?.()
      
    } catch (error) {
      console.error('Error updating product:', error)
      // TODO: Add toast notification for error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset()
      setImagePreview(null)
      setSelectedFile(null)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the product information. Make changes to the fields below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter product description" 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter product type (e.g., Supplement, Equipment, etc.)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (VND)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="file:mr-4 file:py-2 h-14 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                        <Upload className="h-4 w-4 text-muted-foreground" />
                      </div>
                      {imagePreview && (
                        <div className="mt-2">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="h-20 w-20 object-cover rounded-md border"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
