// src/App.jsx
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CtaSection from './components/layout/CtaSection';
import BookList from './components/features/BookList';
import GenreFilter from './components/features/GenreFilter';
import { books, genres } from './data/mockData';

function App() {
  const filterText = '';

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(filterText.toLowerCase()) ||
      book.author.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-container">
          <button className="logo" onClick={() => window.scrollTo(0, 0)}>
            <span>Liber</span>
          </button>
          <div className="nav-desktop">
            <a href="#home" className="nav-link nav-link--active">
              Home
            </a>
            <a href="#browse" className="nav-link">
              Browse
            </a>
            <a href="#about" className="nav-link">
              About Us
            </a>
            <a href="#faq" className="nav-link">
              FAQ
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>

          <div className="nav-actions">
            <button className="nav-icon-btn" aria-label="Search">
              <svg className="icon">
                <use href="#icon-search"></use>
              </svg>
            </button>
            <button className="nav-icon-btn" aria-label="My Library">
              <svg className="icon">
                <use href="#icon-library"></use>
              </svg>
            </button>
            <button className="nav-signin">
              <svg className="icon-small">
                <use href="#icon-user"></use>
              </svg>
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <Header />

      <main className="main">
        <section className="books-section">
          <div className="books-content">
            <div className="books-header">
              <div className="books-header-left">
                <h2 className="books-label">Featured Collection</h2>
                <h3 className="books-title">Staff Picks</h3>
              </div>
              <button className="books-view-all desktop-only">
                View All
                <svg className="icon-small">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </button>
            </div>

            <GenreFilter genres={genres} />
            <BookList books={filteredBooks} />

            <button className="books-view-all mobile-only">
              View All
              <svg className="icon-small">
                <use href="#icon-arrow-right"></use>
              </svg>
            </button>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
