import { useState, useEffect, useRef } from 'react';
import apiService from '../services/api';

// Custom hook for real-time data management
export const useRealTimeData = () => {
  const [data, setData] = useState({
    tokens: [],
    trades: [],
    stats: {},
    lastUpdated: null,
    isLoading: true,
    error: null,
    backendConnected: false
  });

  const [scraperStatus, setScraperStatus] = useState({
    running: false,
    lastCheck: null
  });

  const intervalRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;

  // Function to fetch data from backend
  const fetchData = async () => {
    try {
      // Skip API calls in production if no backend URL is configured
      if (!apiService.baseUrl) {
        console.log('No backend configured, using static data only');
        setData(prev => ({
          ...prev,
          tokens: [],
          trades: [],
          stats: {},
          lastUpdated: null,
          isLoading: false,
          error: null,
          backendConnected: false
        }));
        return;
      }

      const response = await apiService.getAllData();
      setData(prev => ({
        ...prev,
        tokens: response.tokens || [],
        trades: response.trades || [],
        stats: response.stats || {},
        lastUpdated: response.lastUpdated,
        isLoading: false,
        error: null,
        backendConnected: true
      }));
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('Error fetching data from backend:', error);
      setData(prev => ({
        ...prev,
        error: error.message,
        backendConnected: false,
        isLoading: false
      }));

      // Only retry if we have a backend URL configured
      if (apiService.baseUrl && retryCount < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, retryCount), 30000); // Exponential backoff, max 30s
        retryTimeoutRef.current = setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchData();
        }, delay);
      }
    }
  };

  // Function to check scraper status
  const checkScraperStatus = async () => {
    try {
      const status = await apiService.getAutoScraperStatus();
      setScraperStatus({
        running: status.running,
        lastCheck: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error checking scraper status:', error);
    }
  };

  // Function to trigger manual scrape
  const triggerScrape = async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true }));
      await apiService.triggerScraper();
      await fetchData(); // Refresh data after scraping
    } catch (error) {
      console.error('Error triggering scraper:', error);
      setData(prev => ({ ...prev, error: error.message, isLoading: false }));
    }
  };

  // Function to start auto scraper
  const startAutoScraper = async () => {
    try {
      await apiService.startAutoScraper();
      await checkScraperStatus();
    } catch (error) {
      console.error('Error starting auto scraper:', error);
    }
  };

  // Function to stop auto scraper
  const stopAutoScraper = async () => {
    try {
      await apiService.stopAutoScraper();
      await checkScraperStatus();
    } catch (error) {
      console.error('Error stopping auto scraper:', error);
    }
  };

  // Initialize data and set up polling
  useEffect(() => {
    // Initial data fetch
    fetchData();
    
    // Only check scraper status if we have a backend configured
    if (apiService.baseUrl) {
      checkScraperStatus();
      
      // Set up polling every 5 seconds to check for updates
      intervalRef.current = setInterval(() => {
        fetchData();
      }, 5000);

      // Check scraper status every 30 seconds
      const statusInterval = setInterval(checkScraperStatus, 30000);

      // Cleanup
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
        }
        clearInterval(statusInterval);
      };
    }
  }, []);

  // Cleanup retry timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [retryCount]);

  return {
    ...data,
    scraperStatus,
    triggerScrape,
    startAutoScraper,
    stopAutoScraper,
    refetch: fetchData
  };
};