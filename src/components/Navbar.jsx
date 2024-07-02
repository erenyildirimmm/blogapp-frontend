import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Navbar = () => {
  const { token, handleLogout, userId } = useAuth();
  const location = useLocation();
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav((nax) => !nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Bloglar", path: "/", isAuth: false },
    { id: 2, text: "Blog Oluştur", path: "/books/create", isAuth: true },
    { id: 3, text: "Profil", path: `/profile/${userId}`, isAuth: true },
    // { id: 4, text: "Profile", path: "/my-books", isAuth: true },
  ];

  return (
    <div className="bg-gray-900 flex sticky z-50 top-0 justify-between items-center h-24 w-full mx-auto px-4 text-white">
      {/* Logo */}
      <Link to="/">
        <h1 className="text-3xl font-bold text-primary">BookHub</h1>
      </Link>

      <div className="flex items-center gap-8">
        {/* Desktop Navigation */}
        {token && (
          <ul className="hidden md:flex gap-4">
            {navItems.map((item) => (
              <Link to={item.path} key={item.id}>
                <li
                  className={`px-3 py-2 m-2 text-lg font-semibold cursor-pointer duration-100 hover:text-primary ${
                    location.pathname === item.path ? "text-primary" : ""
                  }`}
                >
                  {item.text}
                </li>
              </Link>
            ))}
          </ul>
        )}
        <div className="hidden md:flex">
          {!token ? (
            <>
              <Link
                to="/login"
                className="px-3 py-2 border border-primary text-white rounded-md m-2 cursor-pointer duration-100 hover:bg-primary"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 border border-primary text-white rounded-md m-2 cursor-pointer duration-100 hover:bg-primary"
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              onClick={handleLogout}
              className="px-3 py-2 border-2 border-primary text-white rounded-md m-2 cursor-pointer duration-100 hover:bg-primary"
            >
              Logout
            </Link>
          )}
        </div>
      </div>
      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-primary m-4">REACT.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-md hover:bg-primary duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
