// API Service for DEXY aggregator - Smart backend detection
const LOCAL_BACKEND_URL = 'http://localhost:9999/api';
const VERCEL_BACKEND_URL = '/api'; // Use Vercel's serverless functions that proxy to local backend

// Smart backend selection - PRODUCTION SITES USE VERCEL API, LOCAL DEV USES BACKEND
const isLocalDevelopment = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// USE VERCEL API FOR PRODUCTION, LOCAL BACKEND FOR DEV
const API_BASE_URL = isLocalDevelopment ? LOCAL_BACKEND_URL : VERCEL_BACKEND_URL;

console.log('🔥 API Configuration:', {
  hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
  isLocalDevelopment,
  apiBaseUrl: API_BASE_URL
});

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  // Health check
  async checkHealth() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/health`);
  }

  // Get all data (tokens, trades, stats)
  async getAllData() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/data`);
  }

  // Get trending tokens
  async getTrendingTokens() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/tokens`);
  }

  // Get global trades
  async getGlobalTrades() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/trades`);
  }

  // Get DEX statistics (fallback to data endpoint)
  async getDexStats() {
    if (!this.baseUrl) throw new Error('Backend not available');
    const data = await this.fetchWithTimeout(`${this.baseUrl}/data`);
    return data.stats;
  }

  // Manual update trigger
  async triggerUpdate() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/trigger-update`, {
      method: 'POST',
    }, 15000); // 15 second timeout for Iris update
  }

  // Auto update control
  async startAutoUpdate() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/auto-update/start`, {
      method: 'POST',
    });
  }

  async stopAutoUpdate() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/auto-update/stop`, {
      method: 'POST',
    });
  }

  async getAutoUpdateStatus() {
    if (!this.baseUrl) throw new Error('Backend not available');
    // Use update-status endpoint for Vercel
    return this.fetchWithTimeout(`${this.baseUrl}/update-status`);
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;