export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <p className="text-gray-600">Quản lý tài khoản người dùng và quyền hạn</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Tất cả người dùng</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Thêm người dùng
          </button>
        </div>

        <div className="text-center py-8 text-gray-500">
          <p>Không tìm thấy người dùng nào. Nhấn "Thêm người dùng" để bắt đầu.</p>
        </div>
      </div>
    </div>
  )
}
