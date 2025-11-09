import express from 'express';
import Joi from 'joi';
import { dbRun, dbGet, dbAll, updateTimestamp } from '../database/init.js';

const router = express.Router();

// Validation schemas
const recipeSchema = Joi.object({
  name: Joi.string().required().min(1).max(200),
  ingredients: Joi.array().items(Joi.string().required()).min(1).required(),
  instructions: Joi.string().optional().allow('')
});

const updateRecipeSchema = Joi.object({
  name: Joi.string().optional().min(1).max(200),
  ingredients: Joi.array().items(Joi.string().required()).min(1).optional(),
  instructions: Joi.string().optional().allow('')
}).min(1);

// GET /api/recipes - Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await dbAll(`
      SELECT id, name, ingredients, instructions, created_at, updated_at 
      FROM recipes 
      ORDER BY created_at DESC
    `);
    
    // Parse ingredients from JSON
    const parsedRecipes = recipes.map(recipe => ({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients)
    }));
    
    res.json(parsedRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// GET /api/recipes/:id - Get recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const recipe = await dbGet(`
      SELECT id, name, ingredients, instructions, created_at, updated_at 
      FROM recipes 
      WHERE id = ?
    `, [id]);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    // Parse ingredients from JSON
    const parsedRecipe = {
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients)
    };
    
    res.json(parsedRecipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// POST /api/recipes - Create new recipe
router.post('/', async (req, res) => {
  try {
    const { error, value } = recipeSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.details.map(d => d.message) 
      });
    }
    
    const { name, ingredients, instructions } = value;
    
    const result = await dbRun(`
      INSERT INTO recipes (name, ingredients, instructions) 
      VALUES (?, ?, ?)
    `, [name, JSON.stringify(ingredients), instructions || '']);
    
    const newRecipe = await dbGet(`
      SELECT id, name, ingredients, instructions, created_at, updated_at 
      FROM recipes 
      WHERE id = ?
    `, [result.lastID]);
    
    // Parse ingredients from JSON
    const parsedRecipe = {
      ...newRecipe,
      ingredients: JSON.parse(newRecipe.ingredients)
    };
    
    res.status(201).json(parsedRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// PUT /api/recipes/:id - Update recipe
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateRecipeSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.details.map(d => d.message) 
      });
    }
    
    // Check if recipe exists
    const existingRecipe = await dbGet('SELECT id FROM recipes WHERE id = ?', [id]);
    if (!existingRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];
    
    if (value.name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(value.name);
    }
    
    if (value.ingredients !== undefined) {
      updateFields.push('ingredients = ?');
      updateValues.push(JSON.stringify(value.ingredients));
    }
    
    if (value.instructions !== undefined) {
      updateFields.push('instructions = ?');
      updateValues.push(value.instructions);
    }
    
    updateValues.push(id);
    
    await dbRun(`
      UPDATE recipes 
      SET ${updateFields.join(', ')} 
      WHERE id = ?
    `, updateValues);
    
    await updateTimestamp('recipes', id);
    
    const updatedRecipe = await dbGet(`
      SELECT id, name, ingredients, instructions, created_at, updated_at 
      FROM recipes 
      WHERE id = ?
    `, [id]);
    
    // Parse ingredients from JSON
    const parsedRecipe = {
      ...updatedRecipe,
      ingredients: JSON.parse(updatedRecipe.ingredients)
    };
    
    res.json(parsedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// DELETE /api/recipes/:id - Delete recipe
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if recipe exists
    const existingRecipe = await dbGet('SELECT id FROM recipes WHERE id = ?', [id]);
    if (!existingRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    await dbRun('DELETE FROM recipes WHERE id = ?', [id]);
    
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

export default router;
