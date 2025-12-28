
import React, { useState } from 'react';
import { UserData, Goal, Gender, ActivityLevel } from '../types';

interface UserInputFormProps {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

const UserInputForm: React.FC<UserInputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Partial<UserData>>({
    goal: Goal.LoseWeight,
    gender: Gender.Male,
    age: 25,
    weight: 70,
    height: 175,
    activityLevel: ActivityLevel.ModeratelyActive,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.age || formData.age <= 0) newErrors.age = 'Age must be positive.';
    if (!formData.weight || formData.weight <= 0) newErrors.weight = 'Weight must be positive.';
    if (!formData.height || formData.height <= 0) newErrors.height = 'Height must be positive.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData as UserData);
    }
  };
  
  const InputField: React.FC<{label: string, name: keyof UserData, type?: string, value: any}> = ({label, name, type="number", value}) => (
      <div>
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-slate-300">{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          min="1"
        />
        {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
      </div>
  );

  const SelectField: React.FC<{label: string, name: keyof UserData, options: object, value: any}> = ({label, name, options, value}) => (
      <div>
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-slate-300">{label}</label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          {Object.values(options).map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
  );


  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg sticky top-8">
      <h2 className="text-2xl font-bold mb-6 text-teal-300">Your Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectField label="Goal" name="goal" options={Goal} value={formData.goal} />
        <SelectField label="Gender" name="gender" options={Gender} value={formData.gender} />
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1"><InputField label="Age" name="age" value={formData.age} /></div>
            <div className="col-span-1"><InputField label="Weight (kg)" name="weight" value={formData.weight} /></div>
            <div className="col-span-1"><InputField label="Height (cm)" name="height" value={formData.height} /></div>
        </div>
        <SelectField label="Activity Level" name="activityLevel" options={ActivityLevel} value={formData.activityLevel} />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
              Generating...
            </>
          ) : 'Generate Plan'}
        </button>
      </form>
    </div>
  );
};

export default UserInputForm;
