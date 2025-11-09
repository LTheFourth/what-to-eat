import sqlite3 from 'sqlite3';
import { promisify } from 'util';

const DATABASE_URL = process.env.DATABASE_URL || './database.sqlite';

// Create database connection
export const db = new sqlite3.Database(DATABASE_URL);

// Promisify database methods for async/await
export const dbRun = promisify(db.run.bind(db));
export const dbGet = promisify(db.get.bind(db));
export const dbAll = promisify(db.all.bind(db));

// Initialize database tables
export const initDatabase = async () => {
  try {
    // Create recipes table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create weekly_plans table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS weekly_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        plan_data TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await dbRun('CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON recipes(created_at)');
    await dbRun('CREATE INDEX IF NOT EXISTS idx_plans_created_at ON weekly_plans(created_at)');

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

// Helper function to update timestamp
export const updateTimestamp = (table, id) => {
  return dbRun(`UPDATE ${table} SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [id]);
};

// Close database connection
export const closeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
