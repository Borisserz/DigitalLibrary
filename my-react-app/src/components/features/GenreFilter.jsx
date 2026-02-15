const GenreFilter = ({ genres }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '32px',
        flexWrap: 'wrap',
      }}
    >
      {genres.map((genre, index) => (
        <button
          key={index}
          className="nav-link"
          style={{
            border: '1px solid #e9e9e9',
            borderRadius: '20px',
            padding: '8px 16px',
            cursor: 'pointer',
            backgroundColor: index === 0 ? '#dfecc6' : 'white', // Подсветим первый как активный
          }}
          onClick={() => console.log(`Filter clicked: ${genre}`)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
