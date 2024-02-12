import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import Select from "react-select";
import { useAuth } from "../provider/authProvider";
import dummyImg from "../assets/login.jpg";
import BookPreview from "../components/createBook/bookPreview";

const CreateBooks = () => {
  const { user, auth } = useAuth();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(dummyImg);
  const [category, setCategory] = useState({
    id: "",
    name: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInput, setSelectedInput] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdateBook = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category.id);
    formData.append("content", content);
    formData.append("image", image);
    axios
      .put(`https://api.deerbro.com/books/${id}`, formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Gönderi güncellendi.", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const getEditInfo = async () => {
    try {
      const result = await axios.get("https://api.deerbro.com/books/categories");
      setCategories(result.data.categories);
      const book = await axios.get(`https://api.deerbro.com/books/${id}`);
      const data = book.data;
      setTitle(data.title);
      setContent(data.content);
      setImage(data.imageUrl);
      setAuthor(data.author);
      setPreviewImage(data.imageUrl);
      setCategory({
        id: data.category._id,
        name: data.category.name
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Error", { variant: "error" });
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (auth) {
      getEditInfo();
    }
  }, [auth]);

  const options = categories.map((category) => ({
    value: category.name,
    label: category.name,
    id: category._id,
  }));

  return (
    <div className="container mx-auto pb-8">
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-6 gap-12 pt-10">
          <div className="col-span-2 rounded-md p-3 text-white">
            {user && (
              <BookPreview
                previewImage={previewImage}
                title={title}
                content={content}
                category={category}
                author={author}
                userName={user.name}
                isUpdate={true}
              />
            )}
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="mb-4">
                <label
                  className={`text-md  mr-4 ${
                    selectedInput === "title"
                      ? "text-[#00df9a]"
                      : "text-gray-500"
                  }`}
                >
                  Kitap İsmi
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setSelectedInput("title")}
                  onBlur={() => setSelectedInput("")}
                  className={`w-full mt-3 p-3 border outline-none rounded-md ${
                    selectedInput === "title" ? "border-[#00df9a]" : ""
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className={`text-md  mr-4 ${
                    selectedInput === "author"
                      ? "text-[#00df9a]"
                      : "text-gray-500"
                  }`}
                >
                  Yazar
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  onFocus={() => setSelectedInput("author")}
                  onBlur={() => setSelectedInput("")}
                  className={`w-full mt-3 p-3 border outline-none rounded-md ${
                    selectedInput === "author" ? "border-[#00df9a]" : ""
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className={`text-md  mr-4 ${
                    selectedInput === "image"
                      ? "text-[#00df9a]"
                      : "text-gray-500"
                  }`}
                >
                  Kapak Resmi
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full mt-3 p-3 border outline-none rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className={`text-md  mr-4 ${
                    selectedInput === "category"
                      ? "text-[#00df9a]"
                      : "text-gray-500"
                  }`}
                >
                  Kategori
                </label>
                <Select
                  onFocus={() => setSelectedInput("category")}
                  onBlur={() => setSelectedInput("")}
                  options={options}
                  onChange={(e) => {
                    const category = {
                      id: e.id,
                      name: e.value,
                    };
                    setCategory(category);
                  }}
                  classNames={{
                    control: (state) =>
                      `${
                        state.isFocused && "!border-[#00df9a]"
                      } !shadow-none mt-3 rounded-md p-[6px] border outline-none`,
                  }}
                  classNamePrefix="react-select"
                  placeholder="Bir yazar seçin..."
                />
              </div>
              <div className="col-span-2">
                <div className="mb-4">
                  <label
                    className={`text-md  mr-4 ${
                      selectedInput === "content"
                        ? "text-[#00df9a]"
                        : "text-gray-500"
                    }`}
                  >
                    Özet
                  </label>
                  <textarea
                    type="text"
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onFocus={() => setSelectedInput("content")}
                    onBlur={() => setSelectedInput("")}
                    className={`w-full mt-3 p-3 border outline-none rounded-md ${
                      selectedInput === "content" ? "border-[#00df9a]" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
            <button
              className="p-3 rounded-md ml-auto block bg-[#00df9a] text-white"
              onClick={handleUpdateBook}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBooks;
