import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
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
      localStorage.setItem("userId", userId);
      localStorage.setItem("expiryDate", expiryDate);
      axios
        .get(`http://localhost:3001/users/${userId}`)
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
    }
  }, [token]);

  const contextValue = useMemo(() => ({
    token,
    setToken,
    expiryDate,
    setExpiryDate,
    handleLogout,
    setUserId,
    userId,
    user,
    auth,
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
