import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ChefHat, Clock, Users, ArrowLeft, Sparkles, Zap } from 'lucide-react';
import type { Recipe } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onBack?: () => void;
  isExpanded?: boolean;
}

export function RecipeCard({ recipe, onBack, isExpanded = false }: RecipeCardProps) {
  const [recipeDetails, setRecipeDetails] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const generateRecipeDetails = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b:fastest",
          messages: [
            {
              role: "user",
              content: `Please provide a detailed cooking recipe for "${recipe.recipeName}" with these ingredients: ${recipe.ingredients.join(', ')}. 
          Include step-by-step instructions, cooking time, serving size, and any cooking tips. 
          Format the response in a clear, readable way with sections for ingredients, instructions, cooking time, and tips. critical : response in vietnamese`,
            },
          ],
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipe details');
      }

      const data = await response.json();
      console.log(data);
      const generatedText = data.choices?.[0]?.message?.content || 'Recipe details could not be generated.';
      setRecipeDetails(generatedText);
    } catch (err) {
      setError('Failed to generate recipe details. Please check your API key or try again later.');
      console.error('Error generating recipe:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isExpanded) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          {onBack && (
            <Button
              variant="outline"
              onClick={onBack}
              className="border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to Plan</span>
              <span className="sm:hidden">Back</span>
            </Button>
          )}
          <div className="flex-1"></div>
        </div>

        {/* Recipe Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl shadow-lg mb-3 sm:mb-4">
            <ChefHat className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent px-4">
            {recipe.recipeName}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full">
              <Users className="h-4 w-4 text-emerald-600" />
              <span className="font-medium text-emerald-700">{recipe.ingredients.length} ingredients</span>
            </div>
            <div className="flex items-center gap-2 bg-teal-50 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 text-teal-600" />
              <span className="font-medium text-teal-700">Ready to cook</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Side - Recipe Info */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                Recipe Information
              </CardTitle>
              <CardDescription className="text-slate-600 text-sm sm:text-base">
                Your original recipe details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  Ingredients List
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all duration-200"
                    >
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-emerald-700">{index + 1}</span>
                      </div>
                      <span className="text-slate-700 font-medium text-sm sm:text-base">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Generated Recipe */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="hidden sm:inline">AI Recipe Generator</span>
                <span className="sm:hidden">AI Generator</span>
              </CardTitle>
              <CardDescription className="text-slate-600 text-sm sm:text-base">
                Get detailed cooking instructions powered by AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {!recipeDetails && !error && (
                <div className="text-center py-8 sm:py-12 space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto">
                    <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Ready to cook?</h4>
                    <p className="text-slate-600 text-sm sm:text-base mb-4 sm:mb-6 px-4">
                      Generate detailed cooking instructions with step-by-step guidance
                    </p>
                  </div>
                  <Button
                    onClick={generateRecipeDetails}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-6"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        <span className="hidden sm:inline">Generating...</span>
                        <span className="sm:hidden">Loading...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Generate Recipe Details</span>
                        <span className="sm:hidden">Generate Recipe</span>
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-slate-500 px-4">
                    Note: Add your Hugging Face API key in the component
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-8 sm:py-12 space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-purple-600"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Creating your recipe...</h4>
                    <p className="text-slate-600 text-sm sm:text-base">AI is working its magic in the kitchen</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center py-8 sm:py-12 space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto">
                    <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2 text-sm sm:text-base">Oops! Something went wrong</h4>
                    <p className="text-red-600 text-sm sm:text-base mb-4 sm:mb-6 px-4">{error}</p>
                  </div>
                  <Button
                    onClick={generateRecipeDetails}
                    variant="outline"
                    className="border-red-200 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                  >
                    Try Again
                  </Button>
                </div>
              )}

              {recipeDetails && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-100">
                    <pre className="whitespace-pre-wrap text-xs sm:text-sm text-slate-700 leading-relaxed font-mono">
                      {recipeDetails}
                    </pre>
                  </div>
                  <Button
                    onClick={generateRecipeDetails}
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    className="border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Regenerate Recipe</span>
                    <span className="sm:hidden">Regenerate</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Card className="group border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors duration-200 truncate">
              {recipe.recipeName}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-600" />
              </div>
              <span className="text-emerald-700 font-medium text-xs sm:text-sm">{recipe.ingredients.length} ingredients</span>
            </div>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 2).map((ingredient, index) => (
              <span
                key={index}
                className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200"
              >
                {ingredient.length > 12 ? ingredient.substring(0, 12) + '...' : ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 2 && (
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md border border-emerald-200 font-medium">
                +{recipe.ingredients.length - 2}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="h-3 w-3" />
            <span className="hidden sm:inline">Click to view details & generate recipe</span>
            <span className="sm:hidden">Tap for details</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
