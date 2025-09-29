'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkoutTable, type Exercise } from './WorkoutTable'
import { weeklyWorkoutPlan } from '@/lib/placeholder-data'

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

export function WorkoutPlanner() {
  const [workouts, setWorkouts] = useState(weeklyWorkoutPlan)

  const handleExercisesChange = (day: string, exercises: Exercise[]) => {
    setWorkouts((prevWorkouts) => ({
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
              workouts[dayKeys[index] as keyof typeof workouts] || []
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
