import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose, handleDelete }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-w-full bg-white rounded-xl p-6 flex flex-col relative"
      >
        <h2 className="text-xl mb-9">Gönderiyi silmek istediğine emin misin?</h2>
        <div className="flex items-center justify-center gap-4 w-full">
          <button className="bg-red-600 w-full py-1 px-2 rounded-md text-white" onClick={handleDelete}>
            Sil
          </button>
          <button
            className="bg-[#00df9a] w-full py-1 px-2 rounded-md text-white"
            onClick={onClose}
          >
            Vazgeç
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
