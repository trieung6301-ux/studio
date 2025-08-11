"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { WorkoutTable, type Exercise } from "./WorkoutTable";
import { weeklyWorkoutPlan } from "@/lib/placeholder-data";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function WorkoutPlanner() {
  const [workouts, setWorkouts] = useState(weeklyWorkoutPlan);

  const handleExercisesChange = (day: string, exercises: Exercise[]) => {
    setWorkouts((prevWorkouts) => ({
      ...prevWorkouts,
      [day]: exercises,
    }));
  };

  return (
    <Tabs defaultValue="Monday" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-7 mb-4">
        {daysOfWeek.map((day) => (
          <TabsTrigger key={day} value={day}>
            {day}
          </TabsTrigger>
        ))}
      </TabsList>
      {daysOfWeek.map((day) => (
        <TabsContent key={day} value={day}>
          <WorkoutTable
            day={day}
            initialExercises={workouts[day.toLowerCase() as keyof typeof workouts] || []}
            onExercisesChange={(exercises) =>
              handleExercisesChange(day.toLowerCase(), exercises)
            }
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
