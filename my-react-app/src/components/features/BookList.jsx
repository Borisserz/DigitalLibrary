import BookCard from './BookCard';

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return (
      <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No books found.</p>
    );
  }

  return (
    <div className="books-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
