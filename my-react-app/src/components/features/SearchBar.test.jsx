import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  test('отображает поле ввода и кнопку', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText(/Search by title/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  test('вызывает onSearch при изменении инпута', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/Search by title/i);
    fireEvent.change(input, { target: { value: 'Hobbit' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('Hobbit');
  });
});