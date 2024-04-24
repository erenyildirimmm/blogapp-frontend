import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books, getBooks }) => {
  return (
      books.map((item) => (
        <BookSingleCard key={item._id} book={item} getBooks={getBooks} />
      ))
  );
};

export default BooksCard;