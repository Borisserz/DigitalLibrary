import { ApiService } from './api/apiService.js';
import { LocalStorageService } from './storage/localStorage.js';

document.addEventListener('DOMContentLoaded', async () => {
  const apiService = new ApiService();
  const storageService = new LocalStorageService();

  let currentBooks = [];
  let currentFilter = 'all';

  const gridContainer = document.querySelector('.books-grid');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchBtn = document.querySelector('.search-btn');
  const modal = document.getElementById('book-modal');
  const myLibraryBtn = document.querySelector(
    'button[aria-label="My Library"]'
  );
  const logoBtn = document.querySelector('.logo');
  const navHomeLink = document.querySelector('a[href="#home"]');

  const getStarsHTML = (rating) => {
    const numRating = parseFloat(rating);
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      const filledClass =
        i <= Math.round(numRating) ? 'book-card__star--filled' : '';
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

    if (!booksToRender || booksToRender.length === 0) {
      gridContainer.innerHTML =
        '<p style="grid-column: 1/-1; text-align: center;">Books not found or list is empty.</p>';
      return;
    }

    booksToRender.forEach((book) => {
      const isFav = storageService.isFavorite(book.isbn);

      const btnClass = isFav
        ? 'book-card__favorite book-card__favorite--active'
        : 'book-card__favorite';

      const article = document.createElement('article');
      article.className = 'book-card';
      article.innerHTML = `
        <div class="book-card__image-wrapper">
          <img src="${book.image}" alt="${book.title}" class="book-card__image" onerror="this.src='https://via.placeholder.com/128x195?text=No+Cover'"/>
          
          <button class="${btnClass}" data-isbn="${book.isbn}">
            <svg class="book-card__heart-icon">
              <use href="#icon-heart"></use>
            </svg>
          </button>
          
          <div class="book-card__genre">${book.genre}</div>
        </div>
        <div class="book-card__info">
          <div class="book-card__text">
            <h3 class="book-card__name">${book.title}</h3>
            <p class="book-card__author">${book.author}</p>
          </div>
          <div class="book-card__footer">
            <div class="book-card__rating">
              ${getStarsHTML(book.rating)}
              <span class="book-card__rating-value">${book.rating}</span>
            </div>
            <button class="book-card__read-btn">
              <svg class="icon-tiny"><use href="#icon-library"></use></svg>
              Details
            </button>
          </div>
        </div>
      `;

      const openBook = () => openModal(book);

      article
        .querySelector('.book-card__image-wrapper')
        .addEventListener('click', (e) => {
          if (!e.target.closest('.book-card__favorite')) openBook();
        });
      article
        .querySelector('.book-card__text')
        .addEventListener('click', openBook);
      article
        .querySelector('.book-card__read-btn')
        .addEventListener('click', (e) => {
          e.stopPropagation();
          openBook();
        });

      const favBtn = article.querySelector('.book-card__favorite');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(book, favBtn);
      });

      gridContainer.appendChild(article);
    });
  };

  const toggleFavorite = (book, btnElement) => {
    if (storageService.isFavorite(book.isbn)) {
      storageService.removeFavorite(book.isbn);
      btnElement.classList.remove('book-card__favorite--active');

      if (currentFilter === 'favorites') {
        loadFavorites();
      }
    } else {
      storageService.saveFavorite(book);
      btnElement.classList.add('book-card__favorite--active');
    }
  };

  const loadFavorites = () => {
    currentFilter = 'favorites';
    document.querySelector('.books-title').textContent = 'My Library';
    const favBooks = storageService.getFavorites();
    renderBooks(favBooks);
  };

  const handleSearch = async (query) => {
    if (!query) return;

    gridContainer.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center;">Searching library...</p>';
    searchResults.style.display = 'none';

    try {
      currentBooks = await apiService.searchBooks(query);
      currentFilter = 'search';
      document.querySelector('.books-title').textContent =
        `Results for "${query}"`;
      renderBooks(currentBooks);
    } catch (error) {
      gridContainer.innerHTML =
        '<p style="grid-column: 1/-1; text-align: center; color: red;">Error fetching data. Please try again.</p>';
    }
  };

  const showAllBooks = async () => {
    currentFilter = 'all';
    document.querySelector('.books-title').textContent =
      'Staff Picks (Fiction)';

    if (currentBooks.length === 0 || currentFilter !== 'all') {
      try {
        currentBooks = await apiService.searchBooks('subject:fiction');
      } catch (e) {
        console.error(e);
      }
    }
    renderBooks(currentBooks);
  };

  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    clearTimeout(debounceTimer);
    if (!query) {
      searchResults.style.display = 'none';
      return;
    }

    debounceTimer = setTimeout(async () => {
      try {
        const books = await apiService.searchBooks(query);
        if (books.length > 0) {
          searchResults.innerHTML = books
            .slice(0, 5)
            .map(
              (book) => `
                    <li data-isbn="${book.isbn}">
                    <div style="display:flex; gap:10px; align-items:center;">
                        <img src="${book.image}" style="width:30px; height:45px; object-fit:cover;">
                        <div>
                            <span>${book.title}</span><br>
                            <small>${book.author}</small>
                        </div>
                    </div>
                    </li>
                `
            )
            .join('');
          searchResults.style.display = 'block';
        } else {
          searchResults.style.display = 'none';
        }
      } catch (e) {
        console.error(e);
      }
    }, 500);
  });

  searchResults.addEventListener('click', async (e) => {
    const li = e.target.closest('li');
    if (li) {
      const isbn = li.dataset.isbn;
      searchResults.style.display = 'none';
      handleSearch(searchInput.value);
    }
  });

  searchBtn.addEventListener('click', () => {
    handleSearch(searchInput.value);
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
    const modalDesc = document.getElementById('modal-description');

    modalImg.src = book.image;
    modalImg.onerror = () =>
      (modalImg.src = 'https://via.placeholder.com/300x450?text=No+Cover');

    modalTitle.textContent = book.title;
    modalAuthor.textContent = book.author;
    modalRating.innerHTML = `${getStarsHTML(book.rating)} <span>${book.rating}/5</span>`;
    modalDesc.innerHTML = book.description;

    document.getElementById('reviews-list').innerHTML =
      '<li>Reviews are not available from API.</li>';

    modal.classList.add('active');
  };

  myLibraryBtn.addEventListener('click', loadFavorites);

  logoBtn.addEventListener('click', showAllBooks);
  if (navHomeLink) navHomeLink.addEventListener('click', showAllBooks);

  const viewAllBtns = document.querySelectorAll('.books-view-all');
  viewAllBtns.forEach((btn) => btn.addEventListener('click', showAllBooks));

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

  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  showAllBooks();
});
