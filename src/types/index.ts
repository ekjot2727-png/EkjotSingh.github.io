// Type definitions for the menstrual tracker app

export interface Profile {
  name: string;
  age: number;
  cycleLength: number;
  periodLength: number;
  lastPeriodDate: string | null;
}

export interface PeriodLog {
  id: string;
  date: string;
  flow: 'light' | 'medium' | 'heavy' | 'spotting';
  pain: number; // 1-5 scale
  mood: string;
  symptoms: string[];
  notes: string;
}

export interface HygieneReminder {
  id: string;
  title: string;
  interval: number; // hours
  enabled: boolean;
  lastReminded: string | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  area: string;
  address: string;
  phone: string;
  rating: number;
  distance?: string;
}

export interface EducationArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  icon: string;
  color: 'coral' | 'lavender' | 'mint' | 'peach';
}

export interface MythFact {
  id: string;
  myth: string;
  fact: string;
  category: string;
}

export interface FertilityWindow {
  ovulationDate: string;
  fertileStart: string;
  fertileEnd: string;
}

export interface CyclePrediction {
  nextPeriodDate: string;
  daysUntil: number;
  phase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
  fertilityWindow: FertilityWindow | null;
}
