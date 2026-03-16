import { render, screen, fireEvent } from '@testing-library/react';
import GenreFilter from './GenreFilter';

describe('GenreFilter Component', () => {
  const mockGenres = ['All', 'Fantasy', 'Horror'];

  test('рендерит кнопки переданных жанров', () => {
    render(<GenreFilter genres={mockGenres} />);
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Fantasy')).toBeInTheDocument();
    expect(screen.getByText('Horror')).toBeInTheDocument();
  });

  test('вызывает console.log при клике на жанр', () => {
    // Шпионим за консолью, так как в твоем коде при клике срабатывает console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<GenreFilter genres={mockGenres} />);
    
    const fantasyBtn = screen.getByText('Fantasy');
    fireEvent.click(fantasyBtn);
    
    expect(consoleSpy).toHaveBeenCalledWith('Filter clicked: Fantasy');
    
    consoleSpy.mockRestore(); // Возвращаем консоль в норму
  });
});