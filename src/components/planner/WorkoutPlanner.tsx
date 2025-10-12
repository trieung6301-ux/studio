'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkoutTable } from './WorkoutTable'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { dayKeys, daysOfWeek, getSchedulesGrouped } from '@/lib/api/schedules.api'
import { useQuery } from '@tanstack/react-query'

export function WorkoutPlanner() {
  const { data: workoutsState, refetch } = useQuery({
    queryKey: ['workoutsState'],
    queryFn: () => getSchedulesGrouped(),
    refetchOnWindowFocus: true,
  })

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
            dayName={day}
            day={dayKeys[index]}
            initialExercises={workoutsState?.[dayKeys[index] as keyof typeof workoutsState] || []}
            onExercisesChange={() => refetch()}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
