import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import axios from "axios";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

// image
import loginImage from "./../assets/login.jpg";

const Login = () => {
  const { setToken, setExpiryDate, setUserId } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const result = await axios.post(
        "http://localhost:3001/auth/signin",
        data
      );
      const remainingMilliseconds = 60 * 60 * 1000;
      setToken(result.data.token);
      setUserId(result.data.userId);
      setExpiryDate(
        new Date(new Date().getTime() + remainingMilliseconds).toISOString()
      );
      navigate("/", { replace: true });
      enqueueSnackbar("Giriş Başarılı", { variant: "success" });
    } catch (error) {
      if(error.response.status === 401){
        return enqueueSnackbar("Giriş bilgileriniz hatalı.", { variant: "error" });
      };
      enqueueSnackbar("error", { variant: "error" });
    }
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div
        className="w-full h-screen hidden md:flex"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900">
        <h2 className="text-white text-5xl mb-10">Giriş Yap</h2>
        <form onSubmit={handleLogin} className="flex flex-col w-80">
          <input
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="new-mail"
            value={email ? email : ""}
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
            Login
          </button>
        </form>
        <small className="text-white mt-2">
          Henüz bir hesabın yok mu?{" "}
          <Link to={"/register"} className="text-primary">
            Kayıt Ol
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Login;
