
import React from 'react';
import { WorkoutPlan as WorkoutPlanType } from '../types';

interface WorkoutPlanProps {
  workoutPlan: WorkoutPlanType;
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ workoutPlan }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-teal-300 mb-6">
        <i className="fas fa-dumbbell mr-3"></i>
        Workout Plan
      </h2>
      <div className="space-y-6">
        {workoutPlan.schedule.map((day) => (
          <div key={day.day} className="bg-slate-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-xl text-white">{day.day}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${day.target.toLowerCase() === 'rest' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>{day.target}</span>
            </div>
            {day.exercises.length > 0 ? (
                <ul className="divide-y divide-slate-600">
                    {day.exercises.map((exercise, index) => (
                        <li key={index} className="py-2 flex justify-between items-center">
                            <span className="text-slate-300">{exercise.name}</span>
                            <span className="text-slate-400 font-mono text-sm">{exercise.sets} x {exercise.reps}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-400 text-sm">Enjoy your rest day!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlan;
