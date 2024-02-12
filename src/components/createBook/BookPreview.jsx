import React, { useState } from 'react'
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BookPreview = ({
  previewImage,
  content,
  title,
  author,
  category,
  userName,
  isUpdate = false,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg m-4 relative hover:shadow-xl">
      <span className="py-1 px-2 absolute top-2 right-2 text-sm bg-[#00df9a] text-white rounded-md ">
        {category ? category.value : "Kategori"}
      </span>
      <div
        className="w-full h-60 bg-contain bg-center bg-no-repeat rounded-tl-md rounded-tr-md"
        style={{
          backgroundImage: !isUpdate
            ? `url(${previewImage})`
            : `url(https://api.deerbro.com/${previewImage})`,
        }}
      ></div>
      <div className="px-4 py-2 mb-3">
        <div className="mb-4">
          <h4 className="my-2 inline-block text-white text-lg border-b-2 pb-1 border-[#00df9a]">
            {title ? title : "Kitap İsmi"}
          </h4>
        </div>
        <div className="flex justify-start items-center gap-x-2 mb-3">
          <BiUserCircle className="text-[#00df9a] text-2xl" />
          <h2 className="my-1 text-white">{author ? author : "Yazar"}</h2>
        </div>
        <div className="flex justify-start items-start gap-x-2">
          <PiBookOpenTextLight className="text-[#00df9a] text-2xl" />
          <div className=" text-white max-h-20 text-ellipsis overflow-hidden w-full left-2 box-border line-clamp-3">
            {content ? content : "Özet"}
          </div>
        </div>
      </div>
      <div className="bg-[#00df9a] p-2 rounded-br-md rounded-bl-md">
        {userName}
      </div>
    </div>
  );
};

export default BookPreview