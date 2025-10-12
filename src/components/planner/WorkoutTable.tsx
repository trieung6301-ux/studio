'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle, Trash2, Edit, Save, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { createSchedule } from '@/lib/api/schedules.api'

export interface Exercise {
  id: string
  name: string
  sets: string
  reps: string
  weight: string
}

interface WorkoutTableProps {
  day: string
  initialExercises: Exercise[]
  onExercisesChange: (exercises: Exercise[]) => void
}

export function WorkoutTable({
  day,
  initialExercises,
  onExercisesChange,
}: WorkoutTableProps) {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises)
  const [editingRowId, setEditingRowId] = useState<string | null>(null)
  const [newExercise, setNewExercise] = useState<Omit<Exercise, 'id'>>({
    name: '',
    sets: '',
    reps: '',
    weight: '',
  })

  const handleAddExercise = async () => {
    if (newExercise.name.trim() === '') return

    try {
      const created = await createSchedule({
        day_of_week: day, // ngày hiện tại
        exercise_name: newExercise.name,
        sets: Number(newExercise.sets),
        reps: Number(newExercise.reps),
        weight: Number(newExercise.weight),
      })

      const newExerciseWithId: Exercise = {
        id: created.id.toString(),
        name: created.exercise_name,
        sets: created.sets.toString(),
        reps: created.reps.toString(),
        weight: created.weight.toString(),
      }

      const updatedExercises = [...exercises, newExerciseWithId]
      setExercises(updatedExercises)
      onExercisesChange(updatedExercises)
      setNewExercise({ name: '', sets: '', reps: '', weight: '' })
    } catch (error) {
      console.error('Error adding exercise:', error)
    }
  }

  const handleDeleteExercise = (id: string) => {
    const updatedExercises = exercises.filter((ex) => ex.id !== id)
    setExercises(updatedExercises)
    onExercisesChange(updatedExercises)
  }

  const handleEdit = (exercise: Exercise) => {
    setEditingRowId(exercise.id)
  }

  const handleSave = (id: string) => {
    setEditingRowId(null)
    onExercisesChange(exercises)
  }

  const handleCancelEdit = () => {
    setEditingRowId(null)
    setExercises(initialExercises)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    field: keyof Exercise,
  ) => {
    const { value } = e.target
    setExercises(
      exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex)),
    )
  }

  const handleNewExerciseChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Omit<Exercise, 'id'>,
  ) => {
    setNewExercise({ ...newExercise, [field]: e.target.value })
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          Bài tập của {day}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bài tập</TableHead>
                <TableHead>Số set</TableHead>
                <TableHead>Số rep</TableHead>
                <TableHead>Tạ (kg)</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  {editingRowId === exercise.id ? (
                    <>
                      <TableCell>
                        <Input
                          value={exercise.name}
                          onChange={(e) =>
                            handleInputChange(e, exercise.id, 'name')
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={exercise.sets}
                          onChange={(e) =>
                            handleInputChange(e, exercise.id, 'sets')
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={exercise.reps}
                          onChange={(e) =>
                            handleInputChange(e, exercise.id, 'reps')
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={exercise.weight}
                          onChange={(e) =>
                            handleInputChange(e, exercise.id, 'weight')
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSave(exercise.id)}
                        >
                          <Save className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCancelEdit()}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{exercise.name}</TableCell>
                      <TableCell>{exercise.sets}</TableCell>
                      <TableCell>{exercise.reps}</TableCell>
                      <TableCell>{exercise.weight}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(exercise)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteExercise(exercise.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Input
                    placeholder="Bài tập mới"
                    value={newExercise.name}
                    onChange={(e) => handleNewExerciseChange(e, 'name')}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="VD: 3"
                    value={newExercise.sets}
                    onChange={(e) => handleNewExerciseChange(e, 'sets')}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="VD: 10"
                    value={newExercise.reps}
                    onChange={(e) => handleNewExerciseChange(e, 'reps')}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="VD: 50"
                    value={newExercise.weight}
                    onChange={(e) => handleNewExerciseChange(e, 'weight')}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button onClick={handleAddExercise} size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" /> Thêm
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
