import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";

const Sidebar = () => {
  const { role, token } = useAuth();
  const location = useLocation();
  const [allRoutes, setAllRoutes] = useState([]);
  const superAdminRoutes = [
    { id: 1, text: "Dashboard", path: "/admin" },
    { id: 2, text: "Kullanıcılar", path: `/admin/users` },
    { id: 3, text: "Adminler", path: `/admin/admins` },
    { id: 4, text: "Gönderiler", path: `/admin/posts` },
    { id: 5, text: "Kategoriler", path: `/admin/categories` },
  ];
  const adminRoutes = [];
  useEffect(() => {
    setAllRoutes((prev) => {
      return [
        ...(role === "superadmin"
          ? superAdminRoutes
          : role === "admin"
          ? adminRoutes
          : []),
      ];
    });
  }, [token]);
  return (
    <div className="sidebar w-72 h-screen overflow-y-auto bg-gray-900">
      <div className="p-6">
        <Link to="/admin">
          <h1 className="text-3xl font-bold text-primary text-center">
            BLogHub <span className="text-xs">admin</span>
          </h1>
        </Link>
      </div>
      <ul className="text-white p-4 flex flex-col gap-y-3">
        {allRoutes.map((route) => (
          <li key={route.id}>
            <Link
              to={route.path}
              className={`w-full flex rounded-md p-2 ${
                location.pathname === route.path
                  ? "bg-primary"
                  : "hover:bg-primary/30"
              }`}
            >
              {route.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
