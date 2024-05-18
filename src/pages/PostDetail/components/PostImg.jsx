import React from "react";
import profilePic from "../../../assets/user.png";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostImg = ({ data }) => {
  console.log(data);
  return (
    <div className="wrapper relative">
      <div className="relative after:absolute after:w-full after:h-full after:content-[''] after:top-0 after:left-0 after:bg-black/40 after:rounded-lg">
        <div className="absolute top-0 left-0 md:p-12 p-4 z-10">
          <h1 className="md:text-4xl text-2xl text-white font-bold md:mb-4 mb-2 text-left">
            {data.title}
          </h1>
          <div className="flex items-center gap-4">
            <Link to={`/profile/${data.creator._id}`} className="flex items-center gap-2">
              <img
                src={profilePic}
                className="w-5 h-5 rounded-full"
                alt="profile"
              />
              <span className="text-white md:text-sm text-xs">
                {data.creator.name}
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-white" />
              <span className="md:text-sm text-xs text-white">
                {format(data.createdAt, "dd LLLL yyyy", { locale: tr })}
              </span>
            </div>
          </div>
        </div>
        <img
          src={`http://localhost:3001/${data.imageUrl}`}
          className="rounded-lg w-full"
          alt={data.title}
        />
      </div>
    </div>
  );
};

export default PostImg;
