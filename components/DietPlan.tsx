
import React from 'react';
import { DietPlan as DietPlanType } from '../types';

interface DietPlanProps {
  dietPlan: DietPlanType;
}

const DietPlan: React.FC<DietPlanProps> = ({ dietPlan }) => {
  const mealIcons: { [key: string]: string } = {
    'Breakfast': 'fa-mug-saucer',
    'Lunch': 'fa-utensils',
    'Dinner': 'fa-plate-wheat',
    'Snack': 'fa-apple-whole',
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-teal-300">
            <i className="fas fa-utensils mr-3"></i>
            Nutrition Plan
          </h2>
          <div className="text-right">
              <p className="text-slate-400 text-sm">Daily Goal</p>
              <p className="text-2xl font-bold text-white">{dietPlan.dailyCalories.toLocaleString()} Kcal</p>
          </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dietPlan.meals.map((meal) => (
          <div key={meal.name} className="bg-slate-700 p-4 rounded-lg flex items-start space-x-4">
            <div className="bg-slate-800 rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                <i className={`fas ${mealIcons[meal.name] || 'fa-question-circle'} text-xl text-teal-300`}></i>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{meal.name}</h3>
              <p className="text-sm text-slate-300">{meal.description}</p>
              <p className="text-xs text-slate-400 mt-1 font-mono">{meal.calories} Kcal</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlan;
