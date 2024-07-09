import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const NotFoundComponent = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full pt-48 text-center">
      <h4 className="text-3xl">{title} Bulunamadı</h4>
      <button
        className="inline-flex items-center gap-1 px-3 py-2 text-white rounded-md mt-6 cursor-pointer bg-primary"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoMdArrowRoundBack />
        Geri Dön
      </button>
    </div>
  );
};

export default NotFoundComponent;
