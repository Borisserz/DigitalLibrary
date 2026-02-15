import { API_CONFIG } from './config.js';
import { DataParser } from '../utils/dataParser.js';
import { LocalStorageService } from '../storage/localStorage.js';

export class ApiService {
  constructor() {
    this.storage = new LocalStorageService();
  }

  async searchBooks(query) {
    const cleanQuery = query.trim().toLowerCase();

    const cachedData = this.storage.getCache(cleanQuery);
    if (cachedData) {
      console.log('Serving from cache:', cleanQuery);
      return cachedData;
    }

    try {
      const url = `${API_CONFIG.baseUrl}?q=${encodeURIComponent(cleanQuery)}&maxResults=${API_CONFIG.maxResults}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.items) return [];

      const normalizedBooks = data.items.map((item) =>
        DataParser.normalizeBook(item)
      );

      this.storage.setCache(cleanQuery, normalizedBooks);

      return normalizedBooks;
    } catch (error) {
      console.error('Failed to fetch books:', error);
      throw error;
    }
  }
}
