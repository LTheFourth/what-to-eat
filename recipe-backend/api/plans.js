import { initDatabase } from '../database/init.js';
import { dbRun, dbGet, dbAll, updateTimestamp } from '../database/init.js';
import Joi from 'joi';

// Initialize database on first request
let dbInitialized = false;
const ensureDatabase = async () => {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
};

// Validation schemas
const planSchema = Joi.object({
  name: Joi.string().required().min(1).max(200),
  plan_data: Joi.object().required()
});

const updatePlanSchema = Joi.object({
  name: Joi.string().optional().min(1).max(200),
  plan_data: Joi.object().optional()
}).min(1);

// GET /api/plans - Get all weekly plans
export async function GET(req, res) {
  try {
    await ensureDatabase();
    
    const plans = await dbAll(`
      SELECT id, name, plan_data, created_at, updated_at 
      FROM weekly_plans 
      ORDER BY created_at DESC
    `);
    
    // Parse plan_data from JSON
    const parsedPlans = plans.map(plan => ({
      ...plan,
      plan_data: JSON.parse(plan.plan_data)
    }));
    
    return res.json(parsedPlans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return res.status(500).json({ error: 'Failed to fetch plans' });
  }
}

// GET /api/plans/:id - Get plan by ID
export async function GET_BY_ID(req, res) {
  try {
    await ensureDatabase();
    const { id } = req.params;
    
    const plan = await dbGet(`
      SELECT id, name, plan_data, created_at, updated_at 
      FROM weekly_plans 
      WHERE id = ?
    `, [id]);
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    
    // Parse plan_data from JSON
    const parsedPlan = {
      ...plan,
      plan_data: JSON.parse(plan.plan_data)
    };
    
    return res.json(parsedPlan);
  } catch (error) {
    console.error('Error fetching plan:', error);
    return res.status(500).json({ error: 'Failed to fetch plan' });
  }
}

// POST /api/plans - Create new weekly plan
export async function POST(req, res) {
  try {
    await ensureDatabase();
    const { error, value } = planSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.details.map(d => d.message) 
      });
    }
    
    const { name, plan_data } = value;
    
    const result = await dbRun(`
      INSERT INTO weekly_plans (name, plan_data) 
      VALUES (?, ?)
    `, [name, JSON.stringify(plan_data)]);
    
    const newPlan = await dbGet(`
      SELECT id, name, plan_data, created_at, updated_at 
      FROM weekly_plans 
      WHERE id = ?
    `, [result.lastID]);
    
    // Parse plan_data from JSON
    const parsedPlan = {
      ...newPlan,
      plan_data: JSON.parse(newPlan.plan_data)
    };
    
    return res.status(201).json(parsedPlan);
  } catch (error) {
    console.error('Error creating plan:', error);
    return res.status(500).json({ error: 'Failed to create plan' });
  }
}

// PUT /api/plans/:id - Update plan
export async function PUT(req, res) {
  try {
    await ensureDatabase();
    const { id } = req.params;
    const { error, value } = updatePlanSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.details.map(d => d.message) 
      });
    }
    
    // Check if plan exists
    const existingPlan = await dbGet('SELECT id FROM weekly_plans WHERE id = ?', [id]);
    if (!existingPlan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    
    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];
    
    if (value.name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(value.name);
    }
    
    if (value.plan_data !== undefined) {
      updateFields.push('plan_data = ?');
      updateValues.push(JSON.stringify(value.plan_data));
    }
    
    updateValues.push(id);
    
    await dbRun(`
      UPDATE weekly_plans 
      SET ${updateFields.join(', ')} 
      WHERE id = ?
    `, updateValues);
    
    await updateTimestamp('weekly_plans', id);
    
    const updatedPlan = await dbGet(`
      SELECT id, name, plan_data, created_at, updated_at 
      FROM weekly_plans 
      WHERE id = ?
    `, [id]);
    
    // Parse plan_data from JSON
    const parsedPlan = {
      ...updatedPlan,
      plan_data: JSON.parse(updatedPlan.plan_data)
    };
    
    return res.json(parsedPlan);
  } catch (error) {
    console.error('Error updating plan:', error);
    return res.status(500).json({ error: 'Failed to update plan' });
  }
}

// DELETE /api/plans/:id - Delete plan
export async function DELETE(req, res) {
  try {
    await ensureDatabase();
    const { id } = req.params;
    
    // Check if plan exists
    const existingPlan = await dbGet('SELECT id FROM weekly_plans WHERE id = ?', [id]);
    if (!existingPlan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    
    await dbRun('DELETE FROM weekly_plans WHERE id = ?', [id]);
    
    return res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return res.status(500).json({ error: 'Failed to delete plan' });
  }
}
