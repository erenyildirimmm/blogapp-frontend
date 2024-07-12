import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main>
        <div className="container mx-auto pt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
