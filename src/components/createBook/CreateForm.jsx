import React, { useState } from "react";
import Dropdown from "../../ui/DropDown";
import Input from "../../ui/Input";

const CreateForm = ({
  onInputChange,
  form,
  options,
  onSaveBook,
  onDropdownSelect,
}) => {
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        <Input
          label="Kitap İsmi"
          type="text"
          name="title"
          value={form.title}
          onChange={onInputChange}
          className="mb-4"
        />
        <Input
          label="Yazar"
          type="text"
          name="author"
          value={form.author}
          onChange={onInputChange}
        />
        <Input
          label="Kapak Resmi"
          type="file"
          name="image"
          onChange={onInputChange}
        />
        <Dropdown
          name="category-dropdown"
          label="Kategori"
          className="mb-4"
          options={options}
          data={form.category}
          onSelect={onDropdownSelect}
        />
        <Input
          type="text"
          name="content"
          label="Özet"
          Tag="textarea"
          className={"md:col-span-2 mb-4"}
          value={form.content}
          rows={6}
          onChange={onInputChange}
        />
      </div>
      <button
        className="p-3 rounded-md ml-auto block bg-[#00df9a] text-white"
        onClick={onSaveBook}
      >
        Save
      </button>
    </>
  );
};

export default CreateForm;
