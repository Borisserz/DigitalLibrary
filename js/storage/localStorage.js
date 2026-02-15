export class LocalStorageService {
  constructor() {
    this.keys = {
      BOOKS_CACHE: 'liber_api_cache',
      FAVORITES: 'liber_favorites_data',
    };
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem(this.keys.FAVORITES)) || [];
  }

  saveFavorite(book) {
    const favorites = this.getFavorites();
    if (!favorites.find((b) => b.isbn === book.isbn)) {
      favorites.push(book);
      localStorage.setItem(this.keys.FAVORITES, JSON.stringify(favorites));
    }
  }

  removeFavorite(isbn) {
    let favorites = this.getFavorites();
    favorites = favorites.filter((b) => b.isbn !== isbn);
    localStorage.setItem(this.keys.FAVORITES, JSON.stringify(favorites));
  }

  isFavorite(isbn) {
    const favorites = this.getFavorites();
    return favorites.some((b) => b.isbn === isbn);
  }

  setCache(query, data) {
    const cacheItem = {
      timestamp: Date.now(),
      data: data,
    };
    localStorage.setItem(
      `${this.keys.BOOKS_CACHE}_${query}`,
      JSON.stringify(cacheItem)
    );
  }

  getCache(query) {
    const key = `${this.keys.BOOKS_CACHE}_${query}`;
    const cached = localStorage.getItem(key);

    if (!cached) return null;

    const { timestamp, data } = JSON.parse(cached);
    const oneHour = 60 * 60 * 1000;

    if (Date.now() - timestamp > oneHour) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  }
}
