// API Service for communicating with backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

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
    return this.fetchWithTimeout(`${this.baseUrl}/health`);
  }

  // Get all data (tokens, trades, stats)
  async getAllData() {
    return this.fetchWithTimeout(`${this.baseUrl}/data`);
  }

  // Get trending tokens
  async getTrendingTokens() {
    return this.fetchWithTimeout(`${this.baseUrl}/tokens`);
  }

  // Get global trades
  async getGlobalTrades() {
    return this.fetchWithTimeout(`${this.baseUrl}/trades`);
  }

  // Get DEX statistics
  async getDexStats() {
    return this.fetchWithTimeout(`${this.baseUrl}/stats`);
  }

  // Manual scraper trigger
  async triggerScraper() {
    return this.fetchWithTimeout(`${this.baseUrl}/scrape`, {
      method: 'POST',
    }, 120000); // 2 minute timeout for scraping
  }

  // Auto scraper control
  async startAutoScraper() {
    return this.fetchWithTimeout(`${this.baseUrl}/auto-scraper/start`, {
      method: 'POST',
    });
  }

  async stopAutoScraper() {
    return this.fetchWithTimeout(`${this.baseUrl}/auto-scraper/stop`, {
      method: 'POST',
    });
  }

  async getAutoScraperStatus() {
    return this.fetchWithTimeout(`${this.baseUrl}/auto-scraper/status`);
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;