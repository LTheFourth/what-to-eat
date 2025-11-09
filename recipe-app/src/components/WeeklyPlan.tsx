import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RecipeCard } from './RecipeCard';
import type { Recipe, WeeklyPlan } from '@/lib/utils';
import { DAYS_OF_WEEK, generateWeeklyPlan } from '@/lib/utils';
import { Calendar, Shuffle, Sparkles, Clock } from 'lucide-react';

interface WeeklyPlanProps {
  recipes: Recipe[];
}

export function WeeklyPlan({ recipes }: WeeklyPlanProps) {
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const generatePlan = () => {
    if (recipes.length === 0) return;
    const plan = generateWeeklyPlan(recipes);
    setWeeklyPlan(plan);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToPlan = () => {
    setSelectedRecipe(null);
  };

  if (selectedRecipe) {
    return (
      <div className="w-full">
        <RecipeCard 
          recipe={selectedRecipe} 
          isExpanded={true}
          onBack={handleBackToPlan}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-50 to-teal-50 backdrop-blur-sm">
        <CardHeader className="text-center pb-4 sm:pb-8 px-4 sm:px-6">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            Weekly Meal Planner
          </CardTitle>
          <CardDescription className="text-slate-600 text-sm sm:text-base">
            Generate a personalized meal plan for 6 days with 2-3 recipes per day
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4">
                <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-emerald-200">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                  <span className="font-semibold text-emerald-700 text-xs sm:text-sm">
                    {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} available
                  </span>
                </div>
                {recipes.length > 0 && (
                  <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-teal-200">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600" />
                    <span className="font-medium text-teal-700 text-xs sm:text-sm">
                      {recipes.length * 2.5} meals possible
                    </span>
                  </div>
                )}
              </div>
              <Button 
                onClick={generatePlan} 
                disabled={recipes.length === 0}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base w-full sm:w-auto"
              >
                <Shuffle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span className="hidden sm:inline">Generate Weekly Plan</span>
                <span className="sm:hidden">Generate Plan</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {recipes.length === 0 && (
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="text-center py-8 sm:py-16 px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-slate-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">No recipes available</h3>
            <p className="text-slate-600 max-w-md mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
              Start by adding some delicious recipes to your collection. Once you have recipes saved, you can generate amazing weekly meal plans!
            </p>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Switch to "Add Recipes" tab to get started</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Plan Grid */}
      {weeklyPlan && Object.keys(weeklyPlan).length > 0 && (
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Your Weekly Meal Plan</h2>
            <p className="text-slate-600 text-sm sm:text-base px-4">
              Click on any recipe to view details and generate cooking instructions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {DAYS_OF_WEEK.map((day, dayIndex) => {
              const dayRecipes = weeklyPlan[day] || [];
              const dayColors = [
                'from-blue-500 to-cyan-600',
                'from-purple-500 to-pink-600', 
                'from-orange-500 to-red-600',
                'from-green-500 to-emerald-600',
                'from-indigo-500 to-purple-600',
                'from-teal-500 to-green-600'
              ];
              const gradientClass = dayColors[dayIndex];
              
              return (
                <Card key={day} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Day Header */}
                  <div className={`bg-gradient-to-r ${gradientClass} p-4 sm:p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-1">{day}</h3>
                        <p className="text-white/80 text-xs sm:text-sm">
                          {dayRecipes.length} meal{dayRecipes.length !== 1 ? 's' : ''} planned
                        </p>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Recipes List */}
                  <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {dayRecipes.length === 0 ? (
                      <div className="text-center py-6 sm:py-8">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                          <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
                        </div>
                        <p className="text-slate-500 text-xs sm:text-sm">No meals planned</p>
                      </div>
                    ) : (
                      dayRecipes.map((recipe, recipeIndex) => (
                        <div 
                          key={`${day}-${recipeIndex}`} 
                          onClick={() => handleRecipeClick(recipe)}
                          className="cursor-pointer transform hover:scale-[1.02] transition-transform duration-200"
                        >
                          <div className="group/item">
                            <RecipeCard recipe={recipe} />
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center pt-6 sm:pt-8 px-4">
            <Button 
              onClick={generatePlan} 
              disabled={recipes.length === 0}
              variant="outline"
              className="border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base w-full sm:w-auto"
            >
              <Shuffle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Generate New Plan</span>
              <span className="sm:hidden">New Plan</span>
            </Button>
            <div className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Each plan is randomly generated for variety</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
