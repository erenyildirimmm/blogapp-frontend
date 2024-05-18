import React, { useState } from "react";

const Input = ({ label, className, Tag = 'input', ...props }) => {
  const [selectedInput, setSelectedInput] = useState("");

  const handleFocusInput = (e) => {
    const { name } = e.target;
    setSelectedInput((input) => name);
  };

  const handleBlurInput = () => {
    setSelectedInput((input) => "");
  };
  return (
    <div className={className}>
      {label && (
        <label
          className={`text-md  mr-4 ${
            selectedInput === props.name ? "text-primary" : "text-gray-500"
          }`}
        >
          {label}
        </label>
      )}
      <Tag
        {...props}
        onBlur={handleBlurInput}
        onFocus={handleFocusInput}
        className={`w-full mt-3 p-3 border outline-none rounded-md ${
          selectedInput === props.name ? "border-primary" : ""
        }`}
      />
    </div>
  );
};

export default Input;
