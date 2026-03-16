// src/utils/bookUtils.js
export const searchBooks = (books, query) => {
  if (!query) return books;
  const lowerQuery = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) || 
    book.author.toLowerCase().includes(lowerQuery)
  );
};

export const filterByGenre = (books, genre) => {
  if (!genre || genre === 'All') return books;
  return books.filter(book => book.genre === genre);
};