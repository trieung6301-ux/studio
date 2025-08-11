"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Edit, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

interface WorkoutTableProps {
  day: string;
  initialExercises: Exercise[];
  onExercisesChange: (exercises: Exercise[]) => void;
}

export function WorkoutTable({
  day,
  initialExercises,
  onExercisesChange,
}: WorkoutTableProps) {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [newExercise, setNewExercise] = useState<Omit<Exercise, "id">>({
    name: "",
    sets: "",
    reps: "",
    weight: "",
  });

  const handleAddExercise = () => {
    if (newExercise.name.trim() === "") return;
    const newExerciseWithId = { ...newExercise, id: Date.now().toString() };
    const updatedExercises = [...exercises, newExerciseWithId];
    setExercises(updatedExercises);
    onExercisesChange(updatedExercises);
    setNewExercise({ name: "", sets: "", reps: "", weight: "" });
  };

  const handleDeleteExercise = (id: string) => {
    const updatedExercises = exercises.filter((ex) => ex.id !== id);
    setExercises(updatedExercises);
    onExercisesChange(updatedExercises);
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingRowId(exercise.id);
  };

  const handleSave = (id: string) => {
    setEditingRowId(null);
    onExercisesChange(exercises);
  };
  
  const handleCancelEdit = () => {
    setEditingRowId(null);
    setExercises(initialExercises);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, field: keyof Exercise) => {
    const { value } = e.target;
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, [field]: value } : ex));
  };
  
  const handleNewExerciseChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Omit<Exercise, 'id'>) => {
    setNewExercise({ ...newExercise, [field]: e.target.value });
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">{day}'s Workout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exercise</TableHead>
                <TableHead>Sets</TableHead>
                <TableHead>Reps</TableHead>
                <TableHead>Weight (kg)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  {editingRowId === exercise.id ? (
                    <>
                      <TableCell><Input value={exercise.name} onChange={(e) => handleInputChange(e, exercise.id, 'name')} /></TableCell>
                      <TableCell><Input value={exercise.sets} onChange={(e) => handleInputChange(e, exercise.id, 'sets')} /></TableCell>
                      <TableCell><Input value={exercise.reps} onChange={(e) => handleInputChange(e, exercise.id, 'reps')}/></TableCell>
                      <TableCell><Input value={exercise.weight} onChange={(e) => handleInputChange(e, exercise.id, 'weight')} /></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleSave(exercise.id)}><Save className="h-4 w-4 text-green-500" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleCancelEdit()}><X className="h-4 w-4" /></Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{exercise.name}</TableCell>
                      <TableCell>{exercise.sets}</TableCell>
                      <TableCell>{exercise.reps}</TableCell>
                      <TableCell>{exercise.weight}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(exercise)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteExercise(exercise.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
               <TableRow>
                <TableCell><Input placeholder="New Exercise" value={newExercise.name} onChange={(e) => handleNewExerciseChange(e, 'name')} /></TableCell>
                <TableCell><Input placeholder="e.g., 3" value={newExercise.sets} onChange={(e) => handleNewExerciseChange(e, 'sets')} /></TableCell>
                <TableCell><Input placeholder="e.g., 10" value={newExercise.reps} onChange={(e) => handleNewExerciseChange(e, 'reps')} /></TableCell>
                <TableCell><Input placeholder="e.g., 50" value={newExercise.weight} onChange={(e) => handleNewExerciseChange(e, 'weight')} /></TableCell>
                <TableCell className="text-right">
                  <Button onClick={handleAddExercise} size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
