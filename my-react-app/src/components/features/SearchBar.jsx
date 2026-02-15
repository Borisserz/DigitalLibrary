const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-wrapper">
      <svg className="search-icon">
        <use href="#icon-search"></use>
      </svg>
      <input
        type="text"
        placeholder="Search by title, author, genre..."
        className="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="search-btn">Search</button>
    </div>
  );
};

export default SearchBar;
