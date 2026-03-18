// src/data/mockData.js

export const books = [
  {
    id: 1,
    isbn: '9780451524935',
    title: '1984',
    author: 'George Orwell',
    genre: 'Fiction',
    rating: 4.8,
    status: 'Available',
    // Рабочая ссылка на 1984
    image:
      'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
    description:
      'A dystopian social science fiction novel and cautionary tale.',
  },
  {
    id: 2,
    isbn: '9780061120084',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic',
    rating: 4.9,
    status: 'Taken',
    image:
      'https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg',
    description:
      'The unforgettable novel of a childhood in a sleepy Southern town.',
  },
  {
    id: 3,
    isbn: '9780743273565',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    rating: 4.2,
    status: 'Available',
    image:
      'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
    description:
      'The story of the fabulously wealthy Jay Gatsby and his love for Daisy Buchanan.',
  },
  {
    id: 4,
    isbn: '9780345391803',
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    genre: 'Science',
    rating: 4.6,
    status: 'Available',
    image:
      'https://m.media-amazon.com/images/I/81X4R7QhFkL._AC_UF1000,1000_QL80_.jpg',
    description:
      'Seconds before the Earth is demolished to make way for a galactic freeway...',
  },
];

export const genres = ['All', 'Fiction', 'Classic', 'Science', 'History'];

export const authors = [
  { id: 1, name: 'George Orwell', count: 12 },
  { id: 2, name: 'Harper Lee', count: 2 },
  { id: 3, name: 'Douglas Adams', count: 5 },
];
