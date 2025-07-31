// API Service for communicating with backend
// In production, fallback to static data since backend is not deployed
const API_BASE_URL = process.env.REACT_APP_API_URL || (
  typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api' 
    : null
);

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

  // Get DEX statistics
  async getDexStats() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/stats`);
  }

  // Manual scraper trigger
  async triggerScraper() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/scrape`, {
      method: 'POST',
    }, 120000); // 2 minute timeout for scraping
  }

  // Auto scraper control
  async startAutoScraper() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/auto-scraper/start`, {
      method: 'POST',
    });
  }

  async stopAutoScraper() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/auto-scraper/stop`, {
      method: 'POST',
    });
  }

  async getAutoScraperStatus() {
    if (!this.baseUrl) throw new Error('Backend not available');
    return this.fetchWithTimeout(`${this.baseUrl}/auto-scraper/status`);
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;