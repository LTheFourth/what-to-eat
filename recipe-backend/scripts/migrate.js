import { initDatabase } from '../database/init.js';
import dotenv from 'dotenv';

dotenv.config();

const runMigration = async () => {
  try {
    console.log('🔄 Running database migration...');
    await initDatabase();
    console.log('✅ Database migration completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
