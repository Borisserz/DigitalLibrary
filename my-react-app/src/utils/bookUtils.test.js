import { searchBooks, filterByGenre } from './bookUtils';

const mockBooks = [
  { id: 1, title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy' },
  { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian' },
  { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' }
];

describe('utils/bookUtils', () => {
  describe('searchBooks', () => {
    test('должен находить книгу по автору (нормальный случай)', () => {
      const result = searchBooks(mockBooks, 'Orwell');
      expect(result[0].title).toBe('1984');
    });

    test('должен находить книгу независимо от регистра (крайний случай)', () => {
      const result = searchBooks(mockBooks, 'harry');
      expect(result[0].title).toBe('Harry Potter');
    });

    test('должен возвращать весь список при пустом запросе (ошибки/исключения)', () => {
      const result = searchBooks(mockBooks, '');
      expect(result).toHaveLength(3);
    });
  });

  describe('filterByGenre', () => {
    test('должен фильтровать книги по переданному жанру', () => {
      const result = filterByGenre(mockBooks, 'Fantasy');
      expect(result).toHaveLength(2);
    });

    test('должен возвращать пустой массив, если жанр не найден', () => {
      const result = filterByGenre(mockBooks, 'Romance');
      expect(result).toHaveLength(0);
    });

    test('должен возвращать все книги, если передан "All"', () => {
      const result = filterByGenre(mockBooks, 'All');
      expect(result).toHaveLength(3);
    });
  });
});