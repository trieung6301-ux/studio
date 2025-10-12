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
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add Product
          </button>
        </div>

        <div className="text-center py-8 text-gray-500">
          <p>No products found. Click "Add Product" to get started.</p>
        </div>
      </div>
    </div>
  )
}
