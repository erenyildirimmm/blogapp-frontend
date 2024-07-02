import React from 'react'
import { FiMoreHorizontal } from "react-icons/fi";

const Options = () => {
  return (
    <div className="sm:w-12 sm:h-12 h-8 w-8 flex items-center justify-center  bg-gray-600/60 rounded-full cursor-pointer">
      <FiMoreHorizontal className="sm:text-2xl text-md text-white" />
    </div>
  );
}

export default Options