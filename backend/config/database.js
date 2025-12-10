import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase credentials not provided. Using in-memory mode.');
}

const supabase = createClient(supabaseUrl || 'http://localhost:3000', supabaseKey || 'fake-key');

// Initialize database tables if needed
export const initializeDatabase = async () => {
  try {
    // Check if tables exist by querying them
    const { error } = await supabase.from('profiles').select('count(*)').limit(1);
    
    if (!error) {
      console.log('✅ Database connected successfully');
      return true;
    }
  } catch (err) {
    console.warn('⚠️  Database Connection Error:', err.message);
    console.log('ℹ️  Running in memory mode - data will not persist');
    return false;
  }
};

export default supabase;
