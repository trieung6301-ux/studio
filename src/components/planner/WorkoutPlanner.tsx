'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkoutTable, type Exercise } from './WorkoutTable'
import { weeklyWorkoutPlan } from '@/lib/placeholder-data'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'

const daysOfWeek = [
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
  'Chủ Nhật',
]

const dayKeys = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

export function WorkoutPlanner( { workouts }: { workouts?: Record<string, Exercise[]> }) {
  const [workoutsState, setWorkoutsState] = useState(workouts || weeklyWorkoutPlan)   

  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return null
  }

  if (!isAuthenticated && !isLoading) {
    router.push('/login')
  }


  const handleExercisesChange = (day: string, exercises: Exercise[]) => {
    setWorkoutsState((prevWorkouts) => ({
      ...prevWorkouts,
      [day]: exercises,
    }))
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
            initialExercises={
              workoutsState[dayKeys[index] as keyof typeof workoutsState] || []
            }
            onExercisesChange={(exercises) =>
              handleExercisesChange(dayKeys[index], exercises)
            }
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
