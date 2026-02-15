import Button from '../ui/Button';
import BookStatus from '../ui/BookStatus';

const BookCard = ({ book }) => {
  const handleDetails = () => {
    console.log(`Details clicked for: ${book.title}`);
  };

  return (
    <article className="book-card">
      <div className="book-card__image-wrapper">
        <img src={book.image} alt={book.title} className="book-card__image" />
        <div className="book-card__genre">{book.genre}</div>
      </div>

      <div className="book-card__info">
        <div className="book-card__text">
          <h3 className="book-card__name">{book.title}</h3>
          <p className="book-card__author">{book.author}</p>
          {}
          <BookStatus status={book.status} />
        </div>

        <div className="book-card__footer">
          <div className="book-card__rating">
            <svg className="book-card__star book-card__star--filled">
              <use href="#icon-star"></use>
            </svg>
            <span className="book-card__rating-value">{book.rating}</span>
          </div>

          <Button className="book-card__read-btn" onClick={handleDetails}>
            <svg className="icon-tiny">
              <use href="#icon-library"></use>
            </svg>
            Details
          </Button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
