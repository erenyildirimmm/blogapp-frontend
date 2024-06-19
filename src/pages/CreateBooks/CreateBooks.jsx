import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useSnackbar } from "notistack";
import dummyImg from "../../assets/login.jpg";
import CreateForm from "./components/CreateForm";
import fetchData from "../../api";
import Container from "../../ui/Container";

const CreateBooks = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    title: "",
    entryHeadline: "",
    image: null,
    category: null,
  });
  const [editorContent, setEditorContent] = useState("");
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
      !form.entryHeadline ||
      !form.category ||
      !editorContent ||
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
    formData.append("entryHeadline", form.entryHeadline);
    formData.append("category", form.category.id);
    formData.append("content", editorContent);
    formData.append("image", form.image);
    setLoading(true);
    console.log(formData);
    try {
      const response = await fetchData(
        `${isEdit ? "PUT" : "POST"}`,
        `${isEdit ? `/posts/${id}` : "/posts"}`,
        formData
      );
      if (isEdit) {
        enqueueSnackbar("Post edited.", { variant: "success" });
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
      const response = await fetchData("GET", "/posts/categories");
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
        entryHeadline: bookData.entryHeadline,
        image: bookData.imageUrl,
        category: {
          name: bookData.category.name,
          id: bookData.category._id,
        },
      });
      setEditorContent(bookData.content);
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
    getCategories();
  }, []);

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <CreateForm
          onInputChange={handleInputChange}
          form={form}
          options={options}
          editorContent={editorContent}
          setEditorContent={setEditorContent}
          onSaveBook={handleSaveBook}
          onDropdownSelect={handleDropdownChange}
        />
      )}
    </Container>
  );
};

export default CreateBooks;
