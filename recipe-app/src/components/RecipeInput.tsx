import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Plus, X, ChefHat, Sparkles } from 'lucide-react';
import type { Recipe } from '@/lib/utils';

interface RecipeInputProps {
  onAddRecipe: (recipe: Recipe) => void;
}

export function RecipeInput({ onAddRecipe }: RecipeInputProps) {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [errors, setErrors] = useState<{ recipeName?: string; ingredients?: string }>({});

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients.length > 0 ? newIngredients : ['']);
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const validateForm = () => {
    const newErrors: { recipeName?: string; ingredients?: string } = {};
    
    if (!recipeName.trim()) {
      newErrors.recipeName = 'Recipe name is required';
    }
    
    const validIngredients = ingredients.filter(ing => ing.trim());
    if (validIngredients.length === 0) {
      newErrors.ingredients = 'At least one ingredient is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const validIngredients = ingredients.filter(ing => ing.trim());
      onAddRecipe({
        recipeName: recipeName.trim(),
        ingredients: validIngredients
      });
      
      // Reset form
      setRecipeName('');
      setIngredients(['']);
      setErrors({});
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-4 sm:pb-8 px-4 sm:px-6">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
            <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            Create New Recipe
          </CardTitle>
          <CardDescription className="text-slate-500 text-sm sm:text-base">
            Add your culinary creations to build your personal recipe collection
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-8">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <label htmlFor="recipeName" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                Recipe Name
              </label>
              <Input
                id="recipeName"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="Enter your amazing recipe name..."
                className={`h-11 sm:h-12 text-sm sm:text-base border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-200 ${
                  errors.recipeName ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''
                }`}
              />
              {errors.recipeName && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.recipeName}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  Ingredients
                </label>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md w-fit">
                  {ingredients.filter(ing => ing.trim()).length} active
                </span>
              </div>
              
              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 sm:gap-3 group">
                    <div className="relative flex-1">
                      <Input
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
                        placeholder={`Ingredient ${index + 1}`}
                        className={`h-11 sm:h-12 text-sm sm:text-base border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-200 pr-16 sm:pr-10 ${
                          errors.ingredients && index === 0 ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''
                        }`}
                      />
                      {index === 0 && (
                        <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 hidden sm:block">
                          <span className="text-xs">Required</span>
                        </div>
                      )}
                    </div>
                    {ingredients.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                        className="h-11 w-11 sm:h-12 sm:w-12 border-slate-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-200 flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              {errors.ingredients && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.ingredients}
                </p>
              )}
              
              <Button
                type="button"
                variant="outline"
                onClick={addIngredient}
                className="w-full h-11 sm:h-12 border-dashed border-slate-300 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 text-slate-600 text-sm sm:text-base"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Another Ingredient</span>
                <span className="sm:hidden">Add Ingredient</span>
              </Button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
            >
              <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden sm:inline">Add Recipe to Collection</span>
              <span className="sm:hidden">Add Recipe</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
