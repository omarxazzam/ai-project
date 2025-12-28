
import React, { useState } from 'react';
import { UserData, GeneratedPlan } from './types';
import { generatePlan } from './services/geminiService';
import UserInputForm from './components/UserInputForm';
import PlanDisplay from './components/PlanDisplay';

const App: React.FC = () => {
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = async (userData: UserData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);
    try {
      const planJson = await generatePlan(userData);
      if (planJson) {
         setGeneratedPlan(JSON.parse(planJson));
      } else {
        setError('Failed to generate a plan. The response was empty.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the plan. Please check the console for details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen font-sans text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            AI Diet & Workout Planner
          </h1>
          <p className="text-slate-400 mt-2">Your personalized path to fitness, powered by Gemini.</p>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <UserInputForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-8">
            <PlanDisplay 
              plan={generatedPlan} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
