import api from '@/lib/axios'

export const daysOfWeek = [
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
  'Chủ Nhật',
]

export const dayKeys = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]
/**
 * Định nghĩa cấu trúc dữ liệu lịch tập từ API
 */
export interface ScheduleResponse {
  id: number
  day_of_week: string
  exercise_name: string
  sets: number
  reps: number
  weight: number
  deleted: boolean
}

/**
 * Định nghĩa dữ liệu để tạo mới hoặc cập nhật lịch tập
 */
export interface ScheduleCreate {
  day_of_week: string
  exercise_name: string
  sets: number
  reps: number
  weight: number
}

export interface Exercise {
  id: string
  name: string
  sets: string
  reps: string
  weight: string
}

/**
 * Lấy danh sách lịch tập từ API và nhóm theo ngày trong tuần
 */
export async function getSchedulesGrouped(): Promise<Record<string, Exercise[]>> {
  try {
    const response = await api.get('/schedules')
    const data = response.data

    // Xử lý danh sách trả về (mảng hoặc object có items)
    const schedules: ScheduleResponse[] = Array.isArray(data) ? data : data.items || []

    const grouped: Record<string, Exercise[]> = {}
    dayKeys.forEach((d) => (grouped[d] = []))

    // 🧩 Gom nhóm theo ngày
    for (const s of schedules) {
      const day = s.day_of_week.toLowerCase()

      // Bỏ qua nếu ngày không hợp lệ
      if (!grouped[day]) continue

      grouped[day].push({
        id: s.id.toString(),
        name: s.exercise_name,
        sets: s.sets.toString(),
        reps: s.reps.toString(),
        weight: s.weight.toString(),
      })
    }

    return grouped
  } catch (error) {
    console.error('Error fetching schedules:', error)
    throw error
  }
}

/**
 * Lấy chi tiết một lịch tập theo ID
 */
export async function getScheduleById(id: number | string): Promise<ScheduleResponse> {
  try {
    const response = await api.get(`/schedules/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching schedule with id ${id}:`, error)
    throw error
  }
}

/**
 * Tạo mới một lịch tập
 */
export async function createSchedule(data: ScheduleCreate): Promise<ScheduleResponse> {
  try {
    const response = await api.post('/schedules', data)
    return response.data
  } catch (error) {
    console.error('Error creating schedule:', error)
    throw error
  }
}

/**
 * Cập nhật lịch tập theo ID
 */
export async function updateSchedule(
  id: number | string,
  data: ScheduleCreate,
): Promise<ScheduleResponse> {
  try {
    const response = await api.put(`/schedules/${id}`, data)
    return response.data
  } catch (error) {
    console.error(`Error updating schedule with id ${id}:`, error)
    throw error
  }
}

/**
 * Xóa lịch tập theo ID
 */
export async function deleteSchedule(id: number | string): Promise<void> {
  try {
    await api.delete(`/schedules/${id}`)
  } catch (error) {
    console.error(`Error deleting schedule with id ${id}:`, error)
    throw error
  }
}
