import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";

const ImageUpload = ({ handleFileChange, image }) => {

  return (
    <div className="flex flex-col items-center mb-4">
      <label htmlFor="file-upload" className="cursor-pointer w-full">
        <div className="bg-gray-200 w-full h-full flex justify-center items-center rounded-lg">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Selected file"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-500 w-full p-4 flex items-center justify-center gap-3 min-h-[300px]">
              <IoIosAddCircleOutline size={30} className="text-primary" />
              <span className="text-primary">Select Cover Photo</span>
            </div>
          )}
        </div>
      </label>
      <input
        id="file-upload"
        type="file"
        name="image"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload