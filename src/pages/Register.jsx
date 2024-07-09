import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import axios from "axios";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import fetchData from "../api";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

//image
import registerImage from "./../assets/register.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [isUnique, setIsUnique] = useState(true);
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    socialMedia: {
      facebook: "",
      x: "",
      instagram: "",
      linkedin: "",
    },
  });

  const checkUsername = async (username) => {
    try {
      const isUnique = await fetchData("POST", "/auth/check-username", {
        username: username,
      });
      return isUnique;
    } catch (error) {
      console.error(err);
      return false;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (
      name === "x" ||
      name === "instagram" ||
      name === "linkedin" ||
      name === "facebook"
    ) {
      setUserData((prevData) => ({
        ...prevData,
        socialMedia: {
          ...prevData.socialMedia,
          [name]: value,
        },
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !userData.fullName ||
      !userData.email ||
      !userData.password ||
      !userData.username
    ) {
      enqueueSnackbar("Lütfen tüm alanları doldur.", {
        variant: "error",
        autoHideDuration: 1500,
      });
      return;
    }
    try {
      const isUnique = await checkUsername(userData.username);
      if(!isUnique) {
        enqueueSnackbar("Kullanıcı Adı zaten kullanılıyor. Lütfen farklı bir kullanıcı adı seç.", {
          variant: "error",
          autoHideDuration: 1500,
        });
        return;
      }
      const result = await fetchData("POST", "/auth/signup", userData);
      navigate("/login");
      enqueueSnackbar("Kayıt Başarılı", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response.data.data[0].msg, {
        variant: "error",
        autoHideDuration: 1500,
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div
        className="w-full h-screen hidden md:flex"
        style={{
          backgroundImage: `url(${registerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900">
        <h2 className="text-white text-5xl mb-10">Kayıt Ol</h2>
        <form onSubmit={handleRegister} className="flex flex-col">
          <div className="grid lg:grid-cols-2 lg:gap-x-2">
            <input
              onChange={handleChange}
              name="fullName"
              value={userData.fullName}
              type="text"
              className="mb-3 p-3 border outline-none rounded-md"
              placeholder="İsim Soyisim"
            />
            <div>
              <input
                onChange={handleChange}
                name="username"
                value={userData.username}
                type="text"
                className="mb-3 p-3 border outline-none rounded-md w-full"
                placeholder="Kullanıcı Adı"
              />
              {!isUnique && <small>Bu kullanıcı adı zaten kullanılıyor</small>}
            </div>
            <input
              onChange={handleChange}
              name="email"
              autoComplete="new-mail"
              value={userData.email}
              type="text"
              className="mb-3 p-3 border outline-none rounded-md"
              placeholder="Email"
            />
            <input
              onChange={handleChange}
              name="password"
              autoComplete="new-password"
              value={userData.password}
              type="password"
              className="mb-3 p-3 border outline-none rounded-md "
              placeholder="Password"
            />
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-x-2">
            <div className="flex items-center w-full mb-3 ">
              <span className="p-2 bg-primary h-full flex items-center justify-center rounded-tl-md rounded-bl-md">
                <FaFacebookF />
              </span>
              <input
                onChange={handleChange}
                name="facebook"
                value={userData.socialMedia.facebook}
                type="text"
                className="p-3 border outline-none rounded-tr-md rounded-br-md"
                placeholder="facebook"
              />
            </div>
            <div className="flex items-center w-full mb-3 ">
              <span className="p-2 bg-primary h-full flex items-center justify-center rounded-tl-md rounded-bl-md">
                <FaXTwitter />
              </span>
              <input
                onChange={handleChange}
                name="x"
                value={userData.socialMedia.x}
                type="text"
                className="p-3 border outline-none rounded-tr-md rounded-br-md"
                placeholder="X"
              />
            </div>
            <div className="flex items-center w-full mb-3 ">
              <span className="p-2 bg-primary h-full flex items-center justify-center rounded-tl-md rounded-bl-md ">
                <FaInstagram />
              </span>
              <input
                onChange={handleChange}
                name="instagram"
                value={userData.socialMedia.instagram}
                type="text"
                className="p-3 border outline-none rounded-tr-md rounded-br-md"
                placeholder="instagram"
              />
            </div>
            <div className="flex items-center w-full mb-3 ">
              <span className="p-2 bg-primary h-full flex items-center justify-center rounded-tl-md rounded-bl-md">
                <FaLinkedinIn />
              </span>
              <input
                onChange={handleChange}
                name="linkedin"
                value={userData.socialMedia.linkedin}
                type="text"
                className="p-3 border outline-none rounded-tr-md rounded-br-md"
                placeholder="linkedin"
              />
            </div>
          </div>
          <button className="p-3 block w-full bg-primary text-white rounded-md">
            Kayıt Ol
          </button>
        </form>
        <small className="text-white mt-2">
          Zaten bir hesabın var mı?{" "}
          <Link to={"/login"} className="text-primary">
            Giriş Yap
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Register;
