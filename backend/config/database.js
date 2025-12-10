import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let supabase = null;

// Only create client if credentials are provided
if (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http')) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (err) {
    console.warn('⚠️  Supabase initialization error:', err.message);
  }
} else {
  console.warn('⚠️  Supabase credentials not provided. Using in-memory mode.');
}

// Initialize database tables if needed
export const initializeDatabase = async () => {
  if (!supabase) {
    console.log('ℹ️  Running in memory mode - data will not persist');
    return false;
  }

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
