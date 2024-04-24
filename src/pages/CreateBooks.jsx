import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import { useAuth } from "../provider/authProvider";
import dummyImg from "../assets/login.jpg";
import CreateForm from "../components/createBook/CreateForm";
import BookSingleCard from "../components/home/BookSingleCard";
import fetchData from "../api";
import Container from "../ui/Container";

const CreateBooks = ({ isEdit }) => {
  const { user, auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    image: null,
    category: null,
  });
  const [previewImage, setPreviewImage] = useState(dummyImg);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = categories.map((category) => ({
    name: category.name,
    id: category._id,
  }));

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prevData) => {
      if (name === "image") {
        return { ...prevData, [name]: files[0] };
      }
      return { ...prevData, [name]: value };
    });
    if (name === "image") {
      handlePreviewImageChange(e);
    }
  };

  const handleDropdownChange = (option) => {
    setForm((prevData) => ({ ...prevData, category: option }));
  };

  const handlePreviewImageChange = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSaveBook = async () => {
    if (
      !form.title ||
      !form.author ||
      !form.category ||
      !form.content ||
      !form.image
    ) {
      enqueueSnackbar("Tüm alanları doldurmalısın", {
        variant: "warning",
        autoHideDuration: 1500,
      });
      return;
    }
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("category", form.category.id);
    formData.append("content", form.content);
    formData.append("image", form.image);
    setLoading(true);
    try {
      const response = await fetchData(
        `${isEdit ? "PUT" : "POST"}`,
        `${isEdit ? `/books/${id}` : "/books"}`,
        formData
      );
      if (isEdit) {
        enqueueSnackbar("Book edited.", { variant: "success" });
      } else {
        enqueueSnackbar(response.message, { variant: "success" });
      }
      navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Error", { variant: "error" });
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetchData("GET", "/books/categories");
      setCategories(response.categories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error, { variant: "error" });
      console.log(error);
    }
  };

  const getBook = async () => {
    setLoading(true);
    try {
      const bookData = await fetchData("GET", `/books/${id}`);
      setForm({
        title: bookData.title,
        author: bookData.author,
        content: bookData.content,
        image: bookData.imageUrl,
        category: {
          name: bookData.category.name,
          id: bookData.category._id,
        },
      });
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error, { variant: "error" });
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getBook();
      setLoading(false);
    }
  }, [isEdit]);

  useEffect(() => {
    if (auth) {
      getCategories();
    }
  }, [auth]);

  return (
    <Container>
      {loading ? <Spinner /> : ""}
      <div className="grid lg:grid-cols-6 grid-cols-1 gap-12 pt-10">
        <div className="lg:col-span-2 rounded-md p-3 w-full text-white">
          {user && (
            <BookSingleCard
              book={form}
              preview={true}
              previewImage={previewImage}
            />
          )}
        </div>
        <div className="lg:col-span-4">
          <CreateForm
            onInputChange={handleInputChange}
            form={form}
            options={options}
            onSaveBook={handleSaveBook}
            onDropdownSelect={handleDropdownChange}
          />
        </div>
      </div>
    </Container>
  );
};

export default CreateBooks;
