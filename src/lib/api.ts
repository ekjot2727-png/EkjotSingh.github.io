// API service for communicating with the backend

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  // Profile APIs
  async getProfile(userId = 'default-user') {
    const response = await fetch(`${API_BASE_URL}/profile?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  }

  async updateProfile(profileData) {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  }

  // Period Log APIs
  async getPeriodLogs(userId = 'default-user') {
    const response = await fetch(`${API_BASE_URL}/period-logs?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch period logs');
    return response.json();
  }

  async createPeriodLog(logData) {
    const response = await fetch(`${API_BASE_URL}/period-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData)
    });
    if (!response.ok) throw new Error('Failed to create period log');
    return response.json();
  }

  async updatePeriodLog(id, logData) {
    const response = await fetch(`${API_BASE_URL}/period-logs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData)
    });
    if (!response.ok) throw new Error('Failed to update period log');
    return response.json();
  }

  async deletePeriodLog(id) {
    const response = await fetch(`${API_BASE_URL}/period-logs/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete period log');
    return response.json();
  }

  // Chat APIs
  async getChatHistory(userId = 'default-user') {
    const response = await fetch(`${API_BASE_URL}/chat/history?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch chat history');
    return response.json();
  }

  async sendMessage(message, userId = 'default-user') {
    const response = await fetch(`${API_BASE_URL}/chat/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, userId })
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  }

  async clearChatHistory(userId = 'default-user') {
    const response = await fetch(`${API_BASE_URL}/chat/history?userId=${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to clear chat history');
    return response.json();
  }

  // Gynecologist APIs
  async getGynecologists(params = {}) {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_BASE_URL}/gynecologists?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch gynecologists');
    return response.json();
  }

  async searchGynecologists(query) {
    const response = await fetch(`${API_BASE_URL}/gynecologists/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search gynecologists');
    return response.json();
  }

  async getGynecologistById(id) {
    const response = await fetch(`${API_BASE_URL}/gynecologists/${id}`);
    if (!response.ok) throw new Error('Failed to fetch gynecologist');
    return response.json();
  }

  // Hygiene Reminder APIs
  async getReminders(userId = 'default-user') {
    const response = await fetch(`${API_BASE_URL}/hygiene?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch reminders');
    return response.json();
  }

  async createReminder(reminderData) {
    const response = await fetch(`${API_BASE_URL}/hygiene`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reminderData)
    });
    if (!response.ok) throw new Error('Failed to create reminder');
    return response.json();
  }

  async updateReminder(id, reminderData) {
    const response = await fetch(`${API_BASE_URL}/hygiene/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reminderData)
    });
    if (!response.ok) throw new Error('Failed to update reminder');
    return response.json();
  }

  async deleteReminder(id) {
    const response = await fetch(`${API_BASE_URL}/hygiene/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete reminder');
    return response.json();
  }
}

export const api = new ApiService();
export default api;
