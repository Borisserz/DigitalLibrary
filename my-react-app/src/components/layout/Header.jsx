// src/components/layout/Header.jsx
import SearchBar from '../features/SearchBar';
import heroImg from '../../assets/images/hero-library.jpg';
const Header = () => {
  const handleSearch = (val) => console.log(val);

  return (
    <header className="hero">
      <div className="hero-content">
        <h1 className="hero-title">What you want to read today?</h1>
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
          <p className="search-subtitle">
            Explore over 50,000+ books in our digital collection
          </p>
        </div>
      </div>
      <div className="hero-image">
        {}
        <img src={heroImg} alt="Modern library interior" className="hero-img" />
      </div>
    </header>
  );
};

export default Header;
