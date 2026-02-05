document.addEventListener('DOMContentLoaded', () => {
  const initialBooks = [
    {
      isbn: '9780743273565',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      image: 'images/book-great-gatsby.jpg',
      rating: 4.8,
      reviews: [],
    },
    {
      isbn: '9780525559474',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      genre: 'Fantasy',
      image: 'images/book-midnight-library.jpg',
      rating: 4.6,
      reviews: [],
    },
    {
      isbn: '9780441013593',
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Sci-Fi',
      image: 'images/book-dune.jpg',
      rating: 4.9,
      reviews: [],
    },
    {
      isbn: '9781250301697',
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      genre: 'Mystery',
      image: 'images/book-silent-patient.jpg',
      rating: 4.7,
      reviews: [],
    },
    {
      isbn: '9780385547345',
      title: 'Lessons in Chemistry',
      author: 'Bonnie Garmus',
      genre: 'Fiction',
      image: 'images/book-lessons-in-chemistry.jpg',
      rating: 4.5,
      reviews: [],
    },
    {
      isbn: '9781501161933',
      title: 'All The Light We Cannot See',
      author: 'Anthony Doerr',
      genre: 'Historical',
      image: 'images/book-all-the-light.jpg',
      rating: 4.8,
      reviews: [],
    },
    {
      isbn: '9780593135204',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      genre: 'Sci-Fi',
      image: 'images/book-project-hail-mary.jpg',
      rating: 4.9,
      reviews: [],
    },
    {
      isbn: '9781501139239',
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      genre: 'Fiction',
      image: 'images/book-evelyn-hugo.jpg',
      rating: 4.6,
      reviews: [],
    },
  ];

  let books = JSON.parse(localStorage.getItem('liber_books')) || initialBooks;
  let favorites = JSON.parse(localStorage.getItem('liber_favorites')) || [];

  const saveBooks = () =>
    localStorage.setItem('liber_books', JSON.stringify(books));
  const saveFavorites = () =>
    localStorage.setItem('liber_favorites', JSON.stringify(favorites));

  const gridContainer = document.querySelector('.books-grid');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const modal = document.getElementById('book-modal');
  const myLibraryBtn = document.querySelector(
    'button[aria-label="My Library"]'
  );
  const logoBtn = document.querySelector('.logo');
  const navHomeLink = document.querySelector('a[href="#home"]');

  const getStarsHTML = (rating) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      const filledClass =
        i <= Math.round(rating) ? 'book-card__star--filled' : '';
      stars += `
        <svg class="book-card__star ${filledClass}">
          <use href="#icon-star"></use>
        </svg>
      `;
    }
    return stars;
  };

  const renderBooks = (booksToRender) => {
    gridContainer.innerHTML = '';

    if (booksToRender.length === 0) {
      gridContainer.innerHTML =
        '<p style="grid-column: 1/-1; text-align: center;">No books found.</p>';
      return;
    }

    booksToRender.forEach((book) => {
      const isFav = favorites.includes(book.isbn);

      const btnClass = isFav
        ? 'book-card__favorite book-card__favorite--active'
        : 'book-card__favorite';

      const article = document.createElement('article');
      article.className = 'book-card';
      article.innerHTML = `
        <div class="book-card__image-wrapper">
          <img src="${book.image}" alt="${book.title}" class="book-card__image" />
          
          <!-- ПРИМЕНЯЕМ КЛАСС СЮДА -->
          <button class="${btnClass}" data-isbn="${book.isbn}">
            <svg class="book-card__heart-icon">
              <use href="#icon-heart"></use>
            </svg>
          </button>
          
          <div class="book-card__genre">${book.genre}</div>
        </div>
        <div class="book-card__info">
          <!-- остальной код без изменений -->
          <div class="book-card__text">
            <h3 class="book-card__name">${book.title}</h3>
            <p class="book-card__author">${book.author}</p>
          </div>
          <div class="book-card__footer">
            <div class="book-card__rating">
              ${getStarsHTML(book.rating)}
              <span class="book-card__rating-value">${book.rating}</span>
            </div>
            <button class="book-card__read-btn" data-isbn="${book.isbn}">
              <svg class="icon-tiny"><use href="#icon-library"></use></svg>
              Read
            </button>
          </div>
        </div>
      `;

      article
        .querySelector('.book-card__image-wrapper')
        .addEventListener('click', () => openModal(book));
      article
        .querySelector('.book-card__text')
        .addEventListener('click', () => openModal(book));
      article
        .querySelector('.book-card__read-btn')
        .addEventListener('click', (e) => {
          e.stopPropagation();
          openModal(book);
        });

      const favBtn = article.querySelector('.book-card__favorite');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(book.isbn);
      });

      gridContainer.appendChild(article);
    });
  };

  const toggleFavorite = (isbn) => {
    if (favorites.includes(isbn)) {
      favorites = favorites.filter((id) => id !== isbn);
    } else {
      favorites.push(isbn);
    }
    saveFavorites();
    if (currentFilter === 'favorites') {
      filterFavorites();
    } else {
      renderBooks(books);
    }
  };

  let currentFilter = 'all';
  const filterFavorites = () => {
    currentFilter = 'favorites';
    const favBooks = books.filter((book) => favorites.includes(book.isbn));
    renderBooks(favBooks);
    document.querySelector('.books-title').textContent = 'My Library';
  };

  const showAllBooks = () => {
    currentFilter = 'all';
    renderBooks(books);
    document.querySelector('.books-title').textContent = 'Staff Picks';
  };

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    if (!query) {
      searchResults.style.display = 'none';
      renderBooks(books);
      return;
    }

    const matchedBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.includes(query)
    );

    if (matchedBooks.length > 0) {
      searchResults.innerHTML = matchedBooks
        .map(
          (book) => `
        <li data-isbn="${book.isbn}">
          <span>${book.title}</span>
          <small>${book.author}</small>
        </li>
      `
        )
        .join('');
      searchResults.style.display = 'block';
    } else {
      searchResults.style.display = 'none';
    }

    renderBooks(matchedBooks);
  });

  searchResults.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (li) {
      const isbn = li.dataset.isbn;
      const book = books.find((b) => b.isbn === isbn);
      openModal(book);
      searchResults.style.display = 'none';
      searchInput.value = book.title;
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
      searchResults.style.display = 'none';
    }
  });
  window.closeModal = () => {
    modal.classList.remove('active');
  };

  const openModal = (book) => {
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalAuthor = document.getElementById('modal-author');
    const modalRating = document.getElementById('modal-rating-display');
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');

    modalImg.src = book.image;
    modalTitle.textContent = book.title;
    modalAuthor.textContent = book.author;
    modalRating.innerHTML = `${getStarsHTML(book.rating)} <span>${book.rating}/5</span>`;

    renderReviews(book.reviews);

    reviewForm.onsubmit = (e) => {
      e.preventDefault();
      const text = document.getElementById('review-text').value;
      const rating = parseInt(document.getElementById('review-rating').value);

      const newReview = {
        date: new Date().toLocaleDateString(),
        text: text,
        rating: rating,
      };

      book.reviews.push(newReview);

      const totalRating =
        book.reviews.reduce((acc, curr) => acc + curr.rating, 0) +
        book.rating * 10;
      const newAverage = (totalRating / (book.reviews.length + 10)).toFixed(1);
      book.rating = parseFloat(newAverage);

      saveBooks();
      renderReviews(book.reviews);
      modalRating.innerHTML = `${getStarsHTML(book.rating)} <span>${book.rating}/5</span>`;
      reviewForm.reset();

      if (currentFilter === 'favorites') {
        renderBooks(books.filter((b) => favorites.includes(b.isbn)));
      } else {
        renderBooks(books);
      }
    };

    modal.classList.add('active');
  };

  const renderReviews = (reviews) => {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviews || reviews.length === 0) {
      reviewsList.innerHTML = '<li>No reviews yet. Be the first!</li>';
      return;
    }

    reviewsList.innerHTML = reviews
      .map(
        (review) => `
      <li class="review-item">
        <div class="review-header">
          <strong>Reader</strong>
          <span>${review.date}</span>
        </div>
        <div>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
        <p>${review.text}</p>
      </li>
    `
      )
      .join('');
  };

  myLibraryBtn.addEventListener('click', filterFavorites);

  logoBtn.addEventListener('click', showAllBooks);
  if (navHomeLink) navHomeLink.addEventListener('click', showAllBooks);

  renderBooks(books);

  window.toggleMobileMenu = function () {
    const menu = document.getElementById('mobile-menu');
    const btn = document.querySelector('.mobile-menu-btn');
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
      btn.classList.remove('is-open');
    } else {
      menu.style.display = 'block';
      btn.classList.add('is-open');
    }
  };

  const viewAllBtns = document.querySelectorAll('.books-view-all');
  viewAllBtns.forEach((btn) => {
    btn.addEventListener('click', showAllBooks);
  });

  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
});
