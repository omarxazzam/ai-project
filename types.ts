
export enum Goal {
  LoseWeight = 'Lose Weight',
  GainMuscle = 'Gain Muscle',
  MaintainWeight = 'Maintain Weight',
}

export enum ActivityLevel {
  Sedentary = 'Sedentary (little or no exercise)',
  LightlyActive = 'Lightly active (light exercise/sports 1-3 days/week)',
  ModeratelyActive = 'Moderately active (moderate exercise/sports 3-5 days/week)',
  VeryActive = 'Very active (hard exercise/sports 6-7 days a week)',
  ExtraActive = 'Extra active (very hard exercise/sports & physical job)',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export interface UserData {
  goal: Goal;
  gender: Gender;
  age: number;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
}

export interface Meal {
  name: string;
  description: string;
  calories: number;
}

export interface DietPlan {
  dailyCalories: number;
  meals: Meal[];
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
}

export interface WorkoutDay {
  day: string;
  target: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  schedule: WorkoutDay[];
}

export interface GeneratedPlan {
  dietPlan: DietPlan;
  workoutPlan: WorkoutPlan;
}
