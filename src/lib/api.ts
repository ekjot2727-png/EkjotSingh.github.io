// API service with offline-first architecture
// Works without backend by using localStorage fallbacks

import { 
  getProfile as getLocalProfile, 
  saveProfile as saveLocalProfile,
  getPeriodLogs as getLocalPeriodLogs,
  savePeriodLog as saveLocalPeriodLog,
  deletePeriodLog as deleteLocalPeriodLog,
  getReminders as getLocalReminders,
  saveReminders as saveLocalReminders,
  getChatHistory as getLocalChatHistory,
  saveChatHistory as saveLocalChatHistory,
  clearChatHistory as clearLocalChatHistory
} from './storage';
import { findBestResponse, getFallbackResponse, getSampleDoctors } from './chatbot-knowledge';
import type { Profile, PeriodLog, HygieneReminder } from '@/types';

// Support both localhost for development and environment variable for production
const getApiUrl = () => {
  const envUrl = (import.meta as any).env?.VITE_API_URL;
  
  // If we're in production and have a production URL set, use it
  if (import.meta.env.PROD && envUrl && envUrl !== 'http://localhost:5000/api') {
    return envUrl;
  }
  
  // Try localhost first
  return envUrl || 'http://localhost:5000/api';
};

const API_BASE_URL = getApiUrl();

// Track backend availability - starts as unknown
let backendAvailable: boolean | null = null;
let lastBackendCheck = 0;
const BACKEND_CHECK_INTERVAL = 30000; // Check every 30 seconds

// Check if backend is available with caching
const checkBackendAvailability = async (): Promise<boolean> => {
  const now = Date.now();
  
  // Use cached result if recent
  if (backendAvailable !== null && now - lastBackendCheck < BACKEND_CHECK_INTERVAL) {
    return backendAvailable;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout
    
    const response = await fetch(`${API_BASE_URL}/health`, { 
      method: 'GET',
      mode: 'cors',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    backendAvailable = response.ok;
    lastBackendCheck = now;
  } catch (err) {
    backendAvailable = false;
    lastBackendCheck = now;
  }
  
  return backendAvailable;
};

// Helper to check for gynecologist-related queries
const isGynecologistQuery = (message: string): boolean => {
  const keywords = ['doctor', 'gynecologist', 'gynaecologist', 'find doctor', 'nearby', 'hospital', 'clinic', 'recommend doctor'];
  const lowerMessage = message.toLowerCase();
  return keywords.some(keyword => lowerMessage.includes(keyword));
};

// Extract city from query
const extractCity = (message: string): string => {
  const cities = ['jaipur', 'jodhpur', 'udaipur', 'delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata'];
  const lowerMessage = message.toLowerCase();
  const foundCity = cities.find(city => lowerMessage.includes(city));
  return foundCity || 'jaipur'; // Default to Jaipur
};

// Local chat response generator
const generateLocalChatResponse = (message: string): { content: string; type?: string; doctors?: any[] } => {
  // Check for gynecologist queries
  if (isGynecologistQuery(message)) {
    const city = extractCity(message);
    const doctors = getSampleDoctors(city);
    return {
      type: 'gynecologist_search',
      content: `Here are some recommended gynecologists in ${city.charAt(0).toUpperCase() + city.slice(1)}:`,
      doctors: doctors.map(d => ({
        _id: d.id,
        name: d.name,
        specialty: d.specialty,
        area: d.area,
        address: d.address,
        city: city.charAt(0).toUpperCase() + city.slice(1),
        phone: d.phone,
        rating: d.rating,
        distance: d.distance
      }))
    };
  }

  // Use knowledge base for other queries
  const match = findBestResponse(message);
  if (match) {
    return { content: match.response };
  }

  return { content: getFallbackResponse() };
};

class ApiService {
  // Profile APIs with localStorage fallback
  async getProfile(userId = 'default-user'): Promise<Profile> {
    const isOnline = await checkBackendAvailability();
    
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/profile?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          // Sync to localStorage
          saveLocalProfile(data);
          return data;
        }
      } catch (err) {
        console.log('Backend unavailable, using localStorage');
      }
    }
    
    // Fallback to localStorage
    return getLocalProfile();
  }

  async updateProfile(profileData: Profile): Promise<Profile> {
    // Always save to localStorage first
    saveLocalProfile(profileData);
    
    const isOnline = await checkBackendAvailability();
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        });
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, saved to localStorage');
      }
    }
    
    return profileData;
  }

  // Period Log APIs with localStorage fallback
  async getPeriodLogs(userId = 'default-user'): Promise<PeriodLog[]> {
    const isOnline = await checkBackendAvailability();
    
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/period-logs?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (err) {
        console.log('Backend unavailable, using localStorage');
      }
    }
    
    return getLocalPeriodLogs();
  }

  async createPeriodLog(logData: PeriodLog): Promise<PeriodLog> {
    // Always save to localStorage first
    saveLocalPeriodLog(logData);
    
    const isOnline = await checkBackendAvailability();
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/period-logs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logData)
        });
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, saved to localStorage');
      }
    }
    
    return logData;
  }

  async updatePeriodLog(id: string, logData: PeriodLog): Promise<PeriodLog> {
    // Always save to localStorage first
    saveLocalPeriodLog({ ...logData, id });
    
    const isOnline = await checkBackendAvailability();
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/period-logs/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logData)
        });
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, saved to localStorage');
      }
    }
    
    return { ...logData, id };
  }

  async deletePeriodLog(id: string): Promise<{ success: boolean }> {
    // Always delete from localStorage first
    deleteLocalPeriodLog(id);
    
    const isOnline = await checkBackendAvailability();
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/period-logs/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, deleted from localStorage');
      }
    }
    
    return { success: true };
  }

  // Chat APIs with local AI fallback
  async getChatHistory(userId = 'default-user'): Promise<any[]> {
    const isOnline = await checkBackendAvailability();
    
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/chat/history?userId=${userId}`);
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, using localStorage');
      }
    }
    
    return getLocalChatHistory();
  }

  async sendMessage(message: string, userId = 'default-user'): Promise<any> {
    const isOnline = await checkBackendAvailability();
    
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/chat/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, userId })
        });
        if (response.ok) {
          const result = await response.json();
          // Save to local history
          const history = getLocalChatHistory();
          history.push({ role: 'user', content: message });
          history.push({ role: 'assistant', content: result.content || result });
          saveLocalChatHistory(history);
          return result;
        }
      } catch (err) {
        console.log('Backend unavailable, using local AI');
      }
    }
    
    // Fallback to local AI response
    const localResponse = generateLocalChatResponse(message);
    
    // Save to local history
    const history = getLocalChatHistory();
    history.push({ role: 'user', content: message });
    history.push({ role: 'assistant', content: localResponse.content });
    saveLocalChatHistory(history);
    
    return localResponse;
  }

  async clearChatHistory(userId = 'default-user'): Promise<{ success: boolean }> {
    // Always clear localStorage
    clearLocalChatHistory();
    
    const isOnline = await checkBackendAvailability();
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/chat/history?userId=${userId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, cleared localStorage');
      }
    }
    
    return { success: true };
  }

  // Gynecologist APIs with local data fallback
  async getGynecologists(params: any = {}): Promise<any[]> {
    const isOnline = await checkBackendAvailability();
    
    if (isOnline) {
      try {
        const queryParams = new URLSearchParams(params);
        const response = await fetch(`${API_BASE_URL}/gynecologists?${queryParams}`);
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, using local data');
      }
    }
    
    // Fallback to local sample data
    const city = params.city || 'jaipur';
    return getSampleDoctors(city).map(d => ({
      _id: d.id,
      ...d
    }));
  }

  async searchGynecologists(query: string): Promise<any[]> {
    const isOnline = await checkBackendAvailability();
    
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/gynecologists/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, using local data');
      }
    }
    
    // Fallback: search in local data
    const city = extractCity(query);
    const doctors = getSampleDoctors(city);
    const lowerQuery = query.toLowerCase();
    
    return doctors
      .filter(d => 
        d.name.toLowerCase().includes(lowerQuery) ||
        d.specialty.toLowerCase().includes(lowerQuery) ||
        d.area.toLowerCase().includes(lowerQuery)
      )
      .map(d => ({ _id: d.id, ...d }));
  }

  async getGynecologistById(id: string): Promise<any> {
    const isOnline = await checkBackendAvailability();
    
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/gynecologists/${id}`);
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, using local data');
      }
    }
    
    // Fallback: find in all local data
    const allDoctors = [
      ...getSampleDoctors('jaipur'),
      ...getSampleDoctors('jodhpur'),
      ...getSampleDoctors('udaipur')
    ];
    const doctor = allDoctors.find(d => d.id === id);
    return doctor ? { _id: doctor.id, ...doctor } : null;
  }

  // Hygiene Reminder APIs with localStorage fallback
  async getReminders(userId = 'default-user'): Promise<HygieneReminder[]> {
    const isOnline = await checkBackendAvailability();
    
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/hygiene?userId=${userId}`);
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, using localStorage');
      }
    }
    
    return getLocalReminders();
  }

  async createReminder(reminderData: HygieneReminder): Promise<HygieneReminder> {
    // Save to localStorage first
    const reminders = getLocalReminders();
    reminders.push(reminderData);
    saveLocalReminders(reminders);
    
    const isOnline = await checkBackendAvailability();
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/hygiene`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reminderData)
        });
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, saved to localStorage');
      }
    }
    
    return reminderData;
  }

  async updateReminder(id: string, reminderData: Partial<HygieneReminder>): Promise<HygieneReminder> {
    // Update localStorage first
    const reminders = getLocalReminders();
    const index = reminders.findIndex(r => r.id === id);
    if (index >= 0) {
      reminders[index] = { ...reminders[index], ...reminderData };
      saveLocalReminders(reminders);
    }
    
    const isOnline = await checkBackendAvailability();
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/hygiene/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reminderData)
        });
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, saved to localStorage');
      }
    }
    
    return { id, ...reminderData } as HygieneReminder;
  }

  async deleteReminder(id: string): Promise<{ success: boolean }> {
    // Delete from localStorage first
    const reminders = getLocalReminders().filter(r => r.id !== id);
    saveLocalReminders(reminders);
    
    const isOnline = await checkBackendAvailability();
    if (isOnline) {
      try {
        const response = await fetch(`${API_BASE_URL}/hygiene/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          return response.json();
        }
      } catch (err) {
        console.log('Backend unavailable, deleted from localStorage');
      }
    }
    
    return { success: true };
  }

  // Check if backend is currently available
  async isBackendAvailable(): Promise<boolean> {
    return checkBackendAvailability();
  }
}

export const api = new ApiService();
export default api;
