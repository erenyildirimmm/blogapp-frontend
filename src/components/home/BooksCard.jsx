import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books, getBooks }) => {
  return (
      books.map((item) => (
        <BookSingleCard key={item._id} book={item} getBooks={getBooks} />
      ))
  );
};

export default BooksCard;