import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Recipe {
  recipeName: string;
  ingredients: string[];
}

export interface WeeklyPlan {
  [day: string]: Recipe[];
}

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function generateWeeklyPlan(recipes: Recipe[]): WeeklyPlan {
  if (recipes.length === 0) return {};
  
  const plan: WeeklyPlan = {};
  
  DAYS_OF_WEEK.forEach(day => {
    const dailyRecipes: Recipe[] = [];
    const recipeCount = Math.floor(Math.random() * 2) + 2; // 2-3 recipes per day
    
    for (let i = 0; i < recipeCount; i++) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      dailyRecipes.push(recipes[randomIndex]);
    }
    
    plan[day] = dailyRecipes;
  });
  
  return plan;
}
