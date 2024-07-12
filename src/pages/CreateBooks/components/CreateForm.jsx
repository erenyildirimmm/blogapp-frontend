import Dropdown from "../../../ui/DropDown";
import Input from "../../../ui/Input";
import Editor from "../../../components/Editor";
import ImageUpload from "./ImageUpload";

const CreateForm = ({
  onInputChange,
  form,
  setForm,
  editorContent,
  setEditorContent,
  options,
  onSaveBook,
  onDropdownSelect,
  isEdit
}) => {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <ImageUpload
          handleFileChange={onInputChange}
          setForm={setForm}
          image={form.blogImage}
          isEdit={isEdit}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Title"
            type="text"
            name="title"
            value={form.title}
            onChange={onInputChange}
            className="mb-4"
          />
          <Dropdown
            name="category-dropdown"
            label="Category"
            className="mb-4"
            options={options}
            data={form.category}
            onSelect={onDropdownSelect}
          />
        </div>
        <Input
          type="text"
          name="entryHeadline"
          label="Entry Headline"
          Tag="textarea"
          className={"md:col-span-2 mb-4"}
          value={form.entryHeadline}
          rows={3}
          onChange={onInputChange}
        />
        <div className="relative w-full md:col-span-2">
          <Editor
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            className="mb-4"
            label="Content"
          />
        </div>
        <button
          className="py-3 rounded-md  px-12 ml-auto mt-12 block bg-primary text-white"
          onClick={onSaveBook}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default CreateForm;
