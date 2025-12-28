
import { GoogleGenAI, Type } from "@google/genai";
import { UserData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    dietPlan: {
      type: Type.OBJECT,
      properties: {
        dailyCalories: {
          type: Type.INTEGER,
          description: "Target daily calorie intake."
        },
        meals: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: "Name of the meal (e.g., Breakfast, Lunch, Dinner, Snack)."
              },
              description: {
                type: Type.STRING,
                description: "A brief description of the meal."
              },
              calories: {
                type: Type.INTEGER,
                description: "Estimated calorie count for the meal."
              }
            },
            required: ["name", "description", "calories"]
          }
        }
      },
      required: ["dailyCalories", "meals"]
    },
    workoutPlan: {
      type: Type.OBJECT,
      properties: {
        schedule: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: {
                type: Type.STRING,
                description: "Day of the week (e.g., Monday)."
              },
              target: {
                type: Type.STRING,
                description: "Main focus for the day (e.g., Chest & Triceps, Leg Day, Rest)."
              },
              exercises: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: {
                      type: Type.STRING,
                      description: "Name of the exercise."
                    },
                    sets: {
                      type: Type.STRING,
                      description: "Number of sets (e.g., '3')."
                    },
                    reps: {
                      type: Type.STRING,
                      description: "Number of repetitions (e.g., '8-12')."
                    }
                  },
                  required: ["name", "sets", "reps"]
                }
              }
            },
            required: ["day", "target", "exercises"]
          }
        }
      },
      required: ["schedule"]
    }
  },
  required: ["dietPlan", "workoutPlan"]
};

export const generatePlan = async (userData: UserData): Promise<string | undefined> => {
  const prompt = `
    You are an expert fitness coach and nutritionist. Based on the following user data, generate a personalized 7-day diet and workout plan.

    User Data:
    - Goal: ${userData.goal}
    - Gender: ${userData.gender}
    - Age: ${userData.age} years
    - Weight: ${userData.weight} kg
    - Height: ${userData.height} cm
    - Activity Level: ${userData.activityLevel}

    Please provide the response in a single, minified JSON object format, without any markdown formatting, code blocks, or explanations.
    The JSON object must strictly adhere to the provided schema.

    The diet plan must include a target daily calorie intake and a breakdown of four meals: Breakfast, Lunch, Dinner, and one Snack. For each meal, provide a name, a brief description of food items, and an estimated calorie count.

    The workout plan must be a 7-day schedule, starting from Monday. For each day, specify the target muscle group or activity (e.g., 'Chest & Triceps', 'Leg Day', 'Rest'). For workout days, list at least 4-5 relevant exercises. For each exercise, provide the name, the number of sets, and the number of reps (e.g., '3 sets', '8-12 reps'). Ensure there are at least two rest days in the week.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature: 0.7
    }
  });

  return response.text;
};
