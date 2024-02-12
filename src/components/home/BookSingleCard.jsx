import { Link } from "react-router-dom";
import { useState } from "react";
import BookModal from "./BookModal";
import { useSnackbar } from "notistack";
import { useAuth } from "../../provider/authProvider";

// icons
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import fetchData from "../../api";

const BookSingleCard = ({ book, preview = false, previewImage, getBooks }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { userId } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

  const handleDelete = async (id) => {
    try {
      setShowModal((modal) => false);
      const response = await fetchData("DELETE", `/books/${id}`);
      enqueueSnackbar(response.message, { variant: "success" });
      getBooks();
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  const handleClose = () => {
    setShowModal((current) => false);
  };

  return (
    <div
      className={`rounded-md relative hover:shadow-xl bg-gray-800 max-w-xs ${
        preview && "m-auto"
      }`}
    >
      <div className="flex justify-between w-full absolute top-0 z-20 p-3 items-center">
        <span className="text-sm bg-[#00df9a] text-white rounded-md py-1 px-2">
          {book.category ? book.category.name : "Kategori"}
        </span>
        {!preview && book.creator._id === userId && (
          <div
            className="relative inline-block text-left"
            onClick={() => setIsDropdown(!isDropdown)}
          >
            <div>
              <button className="bg-transparent text-sm text-white shadow-sm">
                <HiDotsVertical className="text-xl" />
              </button>
            </div>
            {isDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div>
                  <Link
                    to={`/books/edit/${book._id}`}
                    className="text-white px-4 py-2 text-sm flex items-center gap-3"
                  >
                    <AiOutlineEdit className="text-lg text-yellow-600 hover:text-black" />
                    <span className="text-md">Düzenle</span>
                  </Link>
                  <div className="h-[1px] w-full bg-gray-600" />
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-white px-4 py-2 text-sm flex items-center gap-3"
                  >
                    <MdOutlineDelete className="text-lg text-red-600 hover:text-black" />
                    <span className="text-md">Sil</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="relative md:h-72 xl:h-80 w-full h-60">
        <div className="absolute h-full top-0 left-0 w-full z-10 bg-gray-900/30 rounded-md"></div>
        <div
          className="h-full top-0 left-0 w-full bg-cover bg-center bg-no-repeat rounded-md"
          style={{
            backgroundImage: `${
              !preview
                ? `url("https://api.deerbro.com/${book.imageUrl}")`
                : `url(${previewImage})`
            }`,
          }}
        ></div>
      </div>
      <div className="absolute bottom-10 z-20 text-center bg-gray-900/80 w-full left-0">
        <h4 className="my-2 inline-block text-white xl:text-lg text-sm pb-1">
          {book.title}
        </h4>
      </div>
      {showModal && (
        <BookModal
          book={book}
          handleDelete={() => handleDelete(book._id)}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default BookSingleCard;
