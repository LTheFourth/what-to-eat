import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { RecipeInput } from './components/RecipeInput';
import { WeeklyPlan } from './components/WeeklyPlan';
import type { Recipe } from './lib/utils';
import { Utensils, Sparkles, Calendar } from 'lucide-react';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleAddRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, recipe]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Modern Header - Responsive */}
      <header className="bg-white border-b border-slate-200/60 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl sm:rounded-2xl blur-lg opacity-20"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                  <Utensils className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Recipe Planner
                </h1>
                <p className="text-slate-500 mt-1 text-sm sm:text-base lg:text-lg">
                  Plan your weekly meals with AI-powered recipes
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 lg:gap-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                <span className="hidden sm:inline">AI Generated</span>
                <span className="sm:hidden">AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-teal-500" />
                <span className="hidden sm:inline">Weekly Planning</span>
                <span className="sm:hidden">Plan</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full max-w-sm sm:max-w-md mx-auto grid-cols-2 bg-slate-100/80 p-1 rounded-xl shadow-sm">
            <TabsTrigger 
              value="input" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg text-slate-700 data-[state=active]:text-slate-900 transition-all duration-200 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Add Recipes</span>
                <span className="sm:hidden">Recipes</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="plan" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg text-slate-700 data-[state=active]:text-slate-900 transition-all duration-200 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Weekly Plan</span>
                <span className="sm:hidden">Plan</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="mt-6 sm:mt-10">
            <div className="space-y-6 sm:space-y-8">
              <RecipeInput onAddRecipe={handleAddRecipe} />
              
              {recipes.length > 0 && (
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="h-px bg-gradient-to-r from-slate-200 to-slate-300 flex-1"></div>
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-800 px-2 sm:px-4">
                      Your Recipes ({recipes.length})
                    </h2>
                    <div className="h-px bg-gradient-to-r from-slate-200 to-slate-300 flex-1"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {recipes.map((recipe, index) => (
                      <div 
                        key={index} 
                        className="group bg-white/80 backdrop-blur-sm p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/60 hover:border-emerald-200/60 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <h3 className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors text-sm sm:text-base">
                            {recipe.recipeName}
                          </h3>
                          <div className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium">
                            {recipe.ingredients.length}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.slice(0, 2).map((ingredient, i) => (
                            <span 
                              key={i} 
                              className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md"
                            >
                              {ingredient.length > 15 ? ingredient.substring(0, 15) + '...' : ingredient}
                            </span>
                          ))}
                          {recipe.ingredients.length > 2 && (
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md font-medium">
                              +{recipe.ingredients.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="plan" className="mt-6 sm:mt-10">
            <WeeklyPlan recipes={recipes} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;
