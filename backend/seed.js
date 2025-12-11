// Lightweight seed script: uses Supabase if configured, otherwise prints instructions.
import dotenv from 'dotenv';
import supabase from './config/database.js';

dotenv.config();

const gynecologists = [
  { id: '1', name: 'Dr. Anjali Sharma', area: 'Malviya Nagar', city: 'Jaipur', phone: '+91-141-2345678', rating: 4.8, consultationFee: 800 },
  { id: '2', name: 'Dr. Priya Meena', area: 'C-Scheme', city: 'Jaipur', phone: '+91-141-3456789', rating: 4.7, consultationFee: 700 },
  { id: '3', name: 'Dr. Kavita Rajput', area: 'Vaishali Nagar', city: 'Jaipur', phone: '+91-141-4567890', rating: 4.9, consultationFee: 1000 }
];

async function seed() {
  if (!supabase) {
    console.log('Supabase not configured. To seed data either set SUPABASE_URL and SUPABASE_KEY in .env or insert data manually.');
    console.log('Sample data (no-op):', gynecologists);
    return;
  }

  try {
    const { error } = await supabase.from('gynecologists').insert(gynecologists);
    if (error) throw error;
    console.log('Seeded gynecologists to Supabase.');
  } catch (err) {
    console.error('Failed to seed Supabase:', err.message || err);
  }
}

seed();
