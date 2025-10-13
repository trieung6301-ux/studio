import { Button } from '@/components/ui/button'

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Products Management</h1>
        <p className="text-gray-600">Manage your product catalog</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">All Products</h2>
          <Button variant="default">Add Product</Button>
        </div>

        <div className="text-center py-8 text-gray-500">
          <p>No products found. Click "Add Product" to get started.</p>
        </div>
      </div>
    </div>
  )
}
