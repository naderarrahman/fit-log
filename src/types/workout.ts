
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: DifficultyLevel;
  duration: number; // minutes
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface PlanItem extends Workout {
  isCompleted?: boolean;
  addedAt?: string;
}