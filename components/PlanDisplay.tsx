
import React from 'react';
import { GeneratedPlan } from '../types';
import DietPlan from './DietPlan';
import WorkoutPlan from './WorkoutPlan';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface PlanDisplayProps {
  plan: GeneratedPlan | null;
  isLoading: boolean;
  error: string | null;
}

const WelcomeMessage: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full bg-slate-800 rounded-xl p-8 text-center shadow-lg">
    <i className="fas fa-chart-line text-5xl text-blue-400 mb-4"></i>
    <h2 className="text-2xl font-bold text-slate-100 mb-2">Ready to Start Your Journey?</h2>
    <p className="text-slate-400">
      Fill in your details on the left and let our AI craft a personalized diet and workout plan just for you.
    </p>
  </div>
);


const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, isLoading, error }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!plan) {
    return <WelcomeMessage />;
  }

  return (
    <div className="space-y-8">
      <DietPlan dietPlan={plan.dietPlan} />
      <WorkoutPlan workoutPlan={plan.workoutPlan} />
    </div>
  );
};

export default PlanDisplay;
