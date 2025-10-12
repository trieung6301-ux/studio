export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users Management</h1>
        <p className="text-gray-600">Manage user accounts and permissions</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">All Users</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add User
          </button>
        </div>

        <div className="text-center py-8 text-gray-500">
          <p>No users found. Click "Add User" to get started.</p>
        </div>
      </div>
    </div>
  )
}
