import React, { useEffect, useState } from "react";
import userImg from "../../assets/user.png";
import { MdMail } from "react-icons/md";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router-dom";
import fetchData from "../../api";
import DefaultBlogCard from "../../components/DefaultBlogCard";
import { useAuth } from "../../provider/authProvider";

const Profile = () => {
  const { userId } = useAuth();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    const result = await fetchData("GET", `/users/${id}`);
    setUserData(result);
    console.log(result);
  };

  useEffect(() => {
    getUser();
  }, [id]);
  return !userData ? (
    <Spinner />
  ) : (
    <div className="container py-10 m-auto">
      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-16">
        <div className="lg:col-span-3 text-dark-900 rounded-md py-6 w-full px-4 text-center">
          <img src={userImg} className="w-44 mx-auto mb-4" alt="" />
          <h2 className="text-2xl mb-3">{userData.name}</h2>
          <div className="flex items-center mb-4 gap-2 justify-center">
            <MdMail />
            <span className="text-xs">{userData.email}</span>
          </div>
          <p className="text-sm mb-6">{userData.status}</p>
          {userData.userId == userId && (
            <div className="flex gap-2 justify-center items-center">
              <button className="border border-red-600 text-red-600 px-3 py-1 rounded-md text-sm  hover:bg-red-600 hover:text-white">
                Hesabı Sil
              </button>
              <button className="border border-yellow-600 text-yellow-600 px-3 py-1 rounded-md text-sm hover:bg-yellow-600 hover:text-white">
                Düzenle
              </button>
            </div>
          )}
        </div>
        <div className="lg:col-span-9">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl">Blogs</h1>
            <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary ">
              <span className="font-semibold">{userData.books.length}</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8 pt-8">
            {userData.books.map((blog) => (
              <DefaultBlogCard key={blog._id} data={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
