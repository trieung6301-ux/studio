'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createProduct, CreateProductData } from '@/lib/api/products.api'
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
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc').max(100, 'Tên phải ít hơn 100 ký tự'),
  description: z.string().min(1, 'Mô tả là bắt buộc').max(500, 'Mô tả phải ít hơn 500 ký tự'),
  type: z.string().min(1, 'Loại sản phẩm là bắt buộc'),
  price: z.coerce.number().min(0, 'Giá phải là số dương').max(999999999, 'Giá quá cao'),
  image: z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

interface AddProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}


export default function AddProductForm({ open, onOpenChange, onSuccess }: AddProductFormProps) {
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
      
      // Create product via API
      await createProduct(productData)
      
      // Reset form and close dialog
      form.reset()
      setImagePreview(null)
      setSelectedFile(null)
      onOpenChange(false)
      onSuccess?.()
      
    } catch (error) {
      console.error('Error creating product:', error)
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
          <DialogTitle>Thêm sản phẩm mới</DialogTitle>
          <DialogDescription>
            Tạo sản phẩm mới cho danh mục của bạn. Điền vào tất cả thông tin bắt buộc.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên sản phẩm" {...field} />
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
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Nhập mô tả sản phẩm" 
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
                    <FormLabel>Loại sản phẩm</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nhập loại sản phẩm (ví dụ: Thực phẩm chức năng, Thiết bị, v.v.)" 
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
                    <FormLabel>Giá (VND)</FormLabel>
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
                  <FormLabel>Hình ảnh sản phẩm</FormLabel>
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
                            alt="Xem trước" 
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
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Đang tạo...' : 'Tạo sản phẩm'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
