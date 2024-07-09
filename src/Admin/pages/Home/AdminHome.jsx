import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import fetchData from "../../../api";
import AdminLayout from "../../components/AdminLayout";

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const data = await fetchData("GET", "/admin/users");
      console.log(data); 
    } catch (error) {
      enqueueSnackbar("Kullanıcılar getirilemedi.", { variant: "error" });
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <AdminLayout>
      Admin
    </AdminLayout>
  );
};

export default AdminHome;
