import { render, screen } from '@testing-library/react';
import BookList from './BookList';

jest.mock('./BookCard', () => ({ book }) => (
  <div data-testid="mock-book-card">{book.title}</div>
));

describe('BookList Component', () => {
  test('отображает сообщение, если книг нет', () => {
    render(<BookList books={[]} />);
    expect(screen.getByText('No books found.')).toBeInTheDocument();
  });

  test('рендерит переданные книги', () => {
    const books = [
      { id: 1, title: 'Book 1' },
      { id: 2, title: 'Book 2' }
    ];
    render(<BookList books={books} />);
    
    const renderedCards = screen.getAllByTestId('mock-book-card');
    expect(renderedCards).toHaveLength(2);
    expect(screen.getByText('Book 1')).toBeInTheDocument();
  });
});