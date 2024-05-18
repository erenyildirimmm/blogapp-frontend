import React, { useState } from "react";
import ReactQuill from "react-quill";   
import "react-quill/dist/quill.snow.css";
import "./editor.css"

const Editor = ({ editorContent, setEditorContent, label, className }) => {
  const [selectedInput, setSelectedInput] = useState("");
    const handleFocusInput = (e) => {
      setSelectedInput(e);
    };

    const handleBlurInput = () => {
      setSelectedInput("");
    };
  return (
    <div className={className}>
      {label && (
        <label
          className={`text-md  mr-4 ${
            selectedInput ? "text-primary" : "text-gray-500"
          }`}
        >
          {label}
        </label>
      )}
      <ReactQuill
        onBlur={handleBlurInput}
        onFocus={handleFocusInput}
        className={`w-full mt-3 border outline-none rounded-md bg-white !border-none ${
          selectedInput ? "border-primary" : ""
        }`}
        theme="snow"
        value={editorContent}
        onChange={setEditorContent}
      />
    </div>
  );
};

export default Editor;
