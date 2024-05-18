import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import axios from "axios";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

//image
import registerImage from "./../assets/register.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    try {
      const result = await axios.put("http://localhost:3001/auth/signup", data);
      navigate("/login");
      enqueueSnackbar("Kayıt Başarılı", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
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
        <form onSubmit={handleRegister} className="flex flex-col w-80">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="mb-3 p-3 border outline-none rounded-md"
            placeholder="İsim Soyisim"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="new-mail"
            value={email}
            type="text"
            className="mb-3 p-3 border outline-none rounded-md"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            value={password}
            type="password"
            className="mb-3 p-3 border outline-none rounded-md "
            placeholder="Password"
          />
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
