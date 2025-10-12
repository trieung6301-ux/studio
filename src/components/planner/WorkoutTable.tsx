'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
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
import { createSchedule, deleteSchedule, Exercise, updateSchedule } from '@/lib/api/schedules.api'

interface WorkoutTableProps {
  dayName: string
  day: string
  initialExercises: Exercise[]
  onExercisesChange: () => void
}

export function WorkoutTable({
  dayName,
  day,
  initialExercises,
  onExercisesChange,
}: WorkoutTableProps) {
  const [editingRowId, setEditingRowId] = useState<string | null>(null)
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [newExercise, setNewExercise] = useState<Omit<Exercise, 'id'>>({
    name: '',
    sets: '',
    reps: '',
    weight: '',
  })

  const exercises = useMemo(() => initialExercises, [initialExercises])

  const handleAddExercise = useCallback(async () => {
    if (newExercise.name.trim() === '') return

    try {
      await createSchedule({
        day_of_week: day, // ngày hiện tại
        exercise_name: newExercise.name,
        sets: Number(newExercise.sets),
        reps: Number(newExercise.reps),
        weight: Number(newExercise.weight),
      })

      onExercisesChange()
      setNewExercise({ name: '', sets: '', reps: '', weight: '' })
    } catch (error) {
      console.error('Error adding exercise:', error)
    }
  }, [newExercise, day, exercises, onExercisesChange])

  const handleDeleteExercise = useCallback(
    async (id: string) => {
      try {
        await deleteSchedule(id)
        // Update local state immediately
        onExercisesChange()
      } catch (error) {
        console.error('Error deleting exercise:', error)
      }
    },
    [exercises, onExercisesChange],
  )

  const handleEdit = useCallback((exercise: Exercise) => {
    setEditingRowId(exercise.id)
    setEditingExercise({ ...exercise })
  }, [])

  const handleSave = useCallback(
    async (id: string) => {
      if (!editingExercise) return

      setEditingRowId(null)
      setEditingExercise(null)

      try {
        await updateSchedule(id, {
          day_of_week: day,
          exercise_name: editingExercise.name,
          sets: Number(editingExercise.sets),
          reps: Number(editingExercise.reps),
          weight: Number(editingExercise.weight),
        })
      } catch (error) {
        console.error('Error updating exercise:', error)
      }
      onExercisesChange()
    },
    [editingExercise, day, onExercisesChange],
  )

  const handleCancelEdit = useCallback(() => {
    setEditingRowId(null)
    setEditingExercise(null)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: string, field: keyof Exercise) => {
      const { value } = e.target
      if (editingExercise) {
        setEditingExercise({ ...editingExercise, [field]: value })
      }
    },
    [editingExercise],
  )

  const handleNewExerciseChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: keyof Omit<Exercise, 'id'>) => {
      setNewExercise({ ...newExercise, [field]: e.target.value })
    },
    [newExercise],
  )

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Bài tập của {dayName}</CardTitle>
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
                          value={editingExercise?.name || ''}
                          onChange={(e) => handleInputChange(e, exercise.id, 'name')}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editingExercise?.sets || ''}
                          onChange={(e) => handleInputChange(e, exercise.id, 'sets')}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editingExercise?.reps || ''}
                          onChange={(e) => handleInputChange(e, exercise.id, 'reps')}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editingExercise?.weight || ''}
                          onChange={(e) => handleInputChange(e, exercise.id, 'weight')}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleSave(exercise.id)}>
                          <Save className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleCancelEdit()}>
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
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(exercise)}>
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
