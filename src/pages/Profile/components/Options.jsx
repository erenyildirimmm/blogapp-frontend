import React, { useState } from "react";
import Modal from "../../../ui/Modal";
import fetchData from "../../../api";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "../../../provider/authProvider";
import { useNavigate } from "react-router-dom";

const Options = ({ userId }) => {
  const [modalIsActive, setModalIsActive] = useState(false);
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await fetchData("DELETE", `/users/delete/${userId}`);
      enqueueSnackbar("Hesabın silindi", {
        variant: "success",
        autoHideDuration: 1500,
      });
      handleLogout();
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Hesabın silinemedi.", {
        variant: "danger",
        autoHideDuration: 1500,
      });
    }
  };
  return (
    <>
      <div className="flex gap-2 justify-center items-center">
        <button
          onClick={() => setModalIsActive(true)}
          className="border border-red-600 text-red-600 px-3 py-1 rounded-md text-sm  hover:bg-red-600 hover:text-white"
        >
          Hesabı Sil
        </button>
        <button className="border border-yellow-600 text-yellow-600 px-3 py-1 rounded-md text-sm hover:bg-yellow-600 hover:text-white">
          Düzenle
        </button>
      </div>
      <Modal
        isActive={modalIsActive}
        onClose={() => setModalIsActive(false)}
        title="Hesabını siliyorsun!"
      >
        <p className="border-l-4 border-primary text-left text-gray-600 pl-4">
          Hesabını silmek istediğine emin misin? Bu işlemi geri alamazsın.
        </p>
        <button
          className="py-2 rounded-md  px-4 ml-auto mt-4 block bg-red-500 text-white"
          onClick={handleDelete}
        >
          Sil
        </button>
      </Modal>
    </>
  );
};

export default Options;
