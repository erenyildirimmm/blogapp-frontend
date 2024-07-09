import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [expiryDate, setExpiryDate] = useState(
    localStorage.getItem("expiryDate")
  );

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const handleLogout = () => {
    setToken();
    setUserId("");
    setUsername("");
    setRole("");
    setExpiryDate();
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      handleLogout();
    }, milliseconds);
  };

  useEffect(() => {
    if (token) {
      // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      setAuth(true);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("expiryDate", expiryDate);
      axios
        .get(`http://localhost:3001/users/${username}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      if (new Date(expiryDate) <= new Date()) {
        handleLogout();
        return;
      }
      const remainingMilliseconds =
        new Date(expiryDate).getTime() - new Date().getTime();
      setAutoLogout(remainingMilliseconds);
    } else {
      // delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expiryDate");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
    }
  }, [token]);

  const contextValue = useMemo(() => ({
    token,
    setToken,
    expiryDate,
    setExpiryDate,
    handleLogout,
    setUsername,
    username,
    userId,
    setUserId,
    user,
    auth,
    role,
    setRole,
  }));

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
