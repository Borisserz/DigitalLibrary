import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from './BookCard';

jest.mock('../ui/Button', () => ({ children, onClick }) => (
  <button onClick={onClick} data-testid="mock-button">
    {children}
  </button>
));
jest.mock('../ui/BookStatus', () => ({ status }) => (
  <div data-testid="mock-status">Status: {status}</div>
));

describe('BookCard Component', () => {
  const mockBook = {
    id: 1,
    title: 'Test Driven Development',
    author: 'Kent Beck',
    genre: 'Programming',
    rating: '5.0',
    status: 'Available',
    image: 'test.jpg',
  };

  test('отображает информацию о книге', () => {
    render(<BookCard book={mockBook} />);

    expect(screen.getByText('Test Driven Development')).toBeInTheDocument();
    expect(screen.getByText('Kent Beck')).toBeInTheDocument();
    expect(screen.getByText('Programming')).toBeInTheDocument();
    expect(screen.getByTestId('mock-status')).toHaveTextContent(
      'Status: Available'
    );
  });

  test('обрабатывает клик по кнопке Details', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<BookCard book={mockBook} />);

    const btn = screen.getByTestId('mock-button');
    fireEvent.click(btn);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Details clicked for: Test Driven Development'
    );
    consoleSpy.mockRestore();
  });
});
