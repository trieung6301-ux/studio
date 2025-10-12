'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkoutTable } from './WorkoutTable'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { Exercise, getSchedulesGrouped } from '@/lib/api/schedules.api'
import { useQuery } from '@tanstack/react-query'

const daysOfWeek = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật']

const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export function WorkoutPlanner() {
  const { data: workoutsState, refetch } = useQuery({
    queryKey: ['workoutsState'],
    queryFn: () => getSchedulesGrouped(),
  })

  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
      </div>
    )
  }

  if (!isAuthenticated && !isLoading) {
    router.push('/login')
  }

  return (
    <Tabs defaultValue="Thứ Hai" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-7 mb-4">
        {daysOfWeek.map((day) => (
          <TabsTrigger key={day} value={day}>
            {day}
          </TabsTrigger>
        ))}
      </TabsList>
      {daysOfWeek.map((day, index) => (
        <TabsContent key={day} value={day}>
          <WorkoutTable
            day={day}
            initialExercises={workoutsState?.[dayKeys[index] as keyof typeof workoutsState] || []}
            onExercisesChange={() => refetch()}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
