import React, { useEffect, useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import { usePost } from "../provider/postProvider";

const PostOptions = ({ data, getUser, className }) => {
  const { handleDelete } = usePost();
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [modalIsActive, setModalIsActive] = useState(false);
  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDelete = async () => {
    setModalIsActive(false);
    await handleDelete(data._id);
    if (location.pathname.split("/")[1] === "profile") {
      getUser(data.creator._id);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsActive((prev) => !prev)}
          className={`${className} rounded-full flex items-center justify-center bg-gray-900/60 cursor-pointer`}
        >
          <FiMoreHorizontal className="text-white" />
        </div>
        {isActive && (
          <div
            onBlur={() => setIsActive(false)}
            className="absolute top-9 text-sm sm:left-0 -left-12 bg-gray-900 rounded-md text-white z-30"
          >
            <ul className="p-3">
              <li
                onClick={() => setModalIsActive(true)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <MdDelete className="text-red-500" />
                Sil
              </li>
              <li className="w-full h-[1px] bg-gray-700 my-2"></li>
              <li className="cursor-pointer">
                <Link
                  className="flex items-center gap-1 "
                  to={`/books/edit/${data.slug}`}
                >
                  <RiEditFill className="text-yellow-500" />
                  Düzenle
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Modal
        isActive={modalIsActive}
        onClose={() => setModalIsActive(false)}
        title="Bir gönderini siliyorsun!"
      >
        <p className="border-l-4 border-primary text-left text-gray-600 pl-4">
          <span className="italic font-semibold inline-block text-gray-600">
            "{data.title}"
          </span>
          {"  "}
          başlıklı gönderini silmek istediğine emin misin? Bu işlemi geri
          alamazsın.
        </p>
        <button
          className="py-2 rounded-md  px-4 ml-auto mt-4 block bg-red-500 text-white"
          onClick={getDelete}
        >
          Sil
        </button>
      </Modal>
    </>
  );
};

export default PostOptions;
