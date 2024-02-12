import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Navbar = () => {
  const { token, handleLogout } = useAuth();
  const location = useLocation();
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav((nax) => !nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Books", path: "/", isAuth: false },
    { id: 2, text: "Create", path: "/books/create", isAuth: true },
    { id: 3, text: "Profile", path: "/profile", isAuth: true },
    // { id: 4, text: "Profile", path: "/my-books", isAuth: true },
  ];

  return (
    <div className="bg-gray-900 flex sticky z-50 top-0 justify-between items-center h-24 w-full mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-[#00df9a]">BookHub</h1>

      {/* Desktop Navigation */}
      {token && (
        <ul className="hidden md:flex">
          {navItems.map((item) => (
            <Link to={item.path} key={item.id}>
              <li
                className={`px-3 py-2 hover:border-b hover:border-[#00df9a] m-2 cursor-pointer duration-100 hover:text-[#00df9a] ${
                  location.pathname === item.path
                    ? "border-b border-[#00df9a] text-[#00df9a]"
                    : ""
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
              className="px-3 py-2 border border-[#00df9a] text-white rounded-md m-2 cursor-pointer duration-100 hover:bg-[#00df9a]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-2 border border-[#00df9a] text-white rounded-md m-2 cursor-pointer duration-100 hover:bg-[#00df9a]"
            >
              Register
            </Link>
          </>
        ) : (
          <Link
            onClick={handleLogout}
            className="px-3 py-2 border-2 border-[#00df9a] text-white rounded-md m-2 cursor-pointer duration-100 hover:bg-[#00df9a]"
          >
            Logout
          </Link>
        )}
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
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">REACT.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-md hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
