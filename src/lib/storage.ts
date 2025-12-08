// localStorage utilities for persisting user data

import type { Profile, PeriodLog, HygieneReminder } from '@/types';

const STORAGE_KEYS = {
  PROFILE: 'luna_profile',
  LOGS: 'luna_period_logs',
  REMINDERS: 'luna_reminders',
  DARK_MODE: 'luna_dark_mode',
  CHAT_HISTORY: 'luna_chat_history',
} as const;

// Default profile
const DEFAULT_PROFILE: Profile = {
  name: '',
  age: 0,
  cycleLength: 28,
  periodLength: 5,
  lastPeriodDate: null,
};

// Profile management
export function getProfile(): Profile {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return stored ? { ...DEFAULT_PROFILE, ...JSON.parse(stored) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: Profile): void {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

// Period logs management
export function getPeriodLogs(): PeriodLog[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LOGS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function savePeriodLog(log: PeriodLog): void {
  const logs = getPeriodLogs();
  const existingIndex = logs.findIndex(l => l.id === log.id);
  
  if (existingIndex >= 0) {
    logs[existingIndex] = log;
  } else {
    logs.push(log);
  }
  
  // Sort by date descending
  logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
}

export function deletePeriodLog(logId: string): void {
  const logs = getPeriodLogs().filter(l => l.id !== logId);
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
}

// Reminders management
export function getReminders(): HygieneReminder[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    return stored ? JSON.parse(stored) : getDefaultReminders();
  } catch {
    return getDefaultReminders();
  }
}

function getDefaultReminders(): HygieneReminder[] {
  return [
    { id: '1', title: 'Change pad/tampon', interval: 4, enabled: true, lastReminded: null },
    { id: '2', title: 'Drink water', interval: 2, enabled: true, lastReminded: null },
    { id: '3', title: 'Take a break & stretch', interval: 3, enabled: false, lastReminded: null },
    { id: '4', title: 'Wash hands after changing', interval: 4, enabled: true, lastReminded: null },
  ];
}

export function saveReminders(reminders: HygieneReminder[]): void {
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
}

export function toggleReminder(reminderId: string): void {
  const reminders = getReminders();
  const reminder = reminders.find(r => r.id === reminderId);
  if (reminder) {
    reminder.enabled = !reminder.enabled;
    saveReminders(reminders);
  }
}

// Dark mode
export function getDarkMode(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return stored === 'true';
  } catch {
    return false;
  }
}

export function saveDarkMode(isDark: boolean): void {
  localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(isDark));
}

// Chat history
export function getChatHistory(): { role: 'user' | 'assistant'; content: string }[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveChatHistory(messages: { role: 'user' | 'assistant'; content: string }[]): void {
  // Keep only last 50 messages
  const trimmed = messages.slice(-50);
  localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(trimmed));
}

export function clearChatHistory(): void {
  localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
}
