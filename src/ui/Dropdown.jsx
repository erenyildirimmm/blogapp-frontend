import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({ options, onSelect, name, label, className }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [selectedInput, setSelectedInput] = useState("");

  const handleSelect = (option) => {
    setSelectedOption((opt) => option.name);
    setDropdown((list) => !list);
    onSelect(option);
  };

  const handleDropdown = () => {
    setDropdown((list) => !list);
  };

  const handleFocusInput = (e) => setSelectedInput((input) => e);

  const handleBlurInput = () => setSelectedInput((input) => "");

  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-md mr-4 ${
            selectedInput === name ? "text-[#00df9a]" : "text-gray-500"
          }`}
        >
          {label}
        </label>
      )}
      <div
        tabIndex={0}
        className={`w-full mt-3 p-3 border outline-none rounded-md flex justify-between items-center ${
          selectedInput === name ? "border-[#00df9a]" : ""
        }`}
        onFocus={() => handleFocusInput(name)}
        onBlur={handleBlurInput}
        onClick={handleDropdown}
      >
        {selectedOption ? (
          selectedOption
        ) : (
          <span className="text-gray-500">Bir kategori seçin...</span>
        )}
        <IoIosArrowDown
          className={
            dropdown
              ? "rotate-180 duration-75 ease-in-out"
              : "duration-100 ease-in-out"
          }
        />
      </div>
      {dropdown && (
        <ul className="absolute bg-white text-gray-900 border rounded-md mt-2 w-full overflow-y-auto max-h-80 shadow">
          {options.map((option) => (
            <li
              key={option.id}
              className="p-3 hover:bg-[#00df9a] hover:text-white cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
