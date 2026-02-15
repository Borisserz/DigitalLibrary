export class DataParser {
  static normalizeBook(googleBookItem) {
    const info = googleBookItem.volumeInfo;

    let isbn = googleBookItem.id;
    if (info.industryIdentifiers) {
      const isbn13 = info.industryIdentifiers.find(
        (id) => id.type === 'ISBN_13'
      );
      if (isbn13) isbn = isbn13.identifier;
    }

    let image = 'images/book-placeholder.jpg';
    if (info.imageLinks && info.imageLinks.thumbnail) {
      image = info.imageLinks.thumbnail.replace('http://', 'https://');
    }

    return {
      id: googleBookItem.id,
      isbn: isbn,
      title: info.title || 'Unknown Title',
      author: info.authors ? info.authors.join(', ') : 'Unknown Author',
      genre: info.categories ? info.categories[0] : 'General',
      image: image,
      rating: info.averageRating || (Math.random() * 2 + 3).toFixed(1),
      description: info.description || 'No description available.',
      reviews: [],
    };
  }
}
