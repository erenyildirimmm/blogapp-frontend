import React from "react";
import CardBox from "./CardBox";
import { Link } from "react-router-dom";
import profilePic from "../assets/user.png";
import { useAuth } from "../provider/authProvider";
import PostOptions from "./PostOptions";

const DefaultBlogCard = ({ data, getUser }) => {
  const { userId } = useAuth();
  console.log(data);
  return (
    <CardBox className="relative h-72">
      <img
        src={`http://localhost:3001/${data.imageUrl}`}
        className="object-cover w-full rounded-tl-lg rounded-tr-lg h-36"
        alt=""
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Link to={`/books/${data.slug}`}>
            <h2 className="font-bold text-xl hover:text-primary">
              {data.title}
            </h2>
          </Link>
          {data.creator._id == userId && <PostOptions data={data} getUser={getUser} className="w-6 h-6" />}
        </div>
        <Link to={`/profile/${data.creator.username}`}>
          <div className="absolute bottom-9 flex items-center gap-2">
            <img
              src={profilePic}
              className="w-5 h-5 rounded-full"
              alt="profile"
            />
            <span className="text-xs text-black/70">{data.creator.fullName}</span>
          </div>
        </Link>
      </div>
    </CardBox>
  );
};

export default DefaultBlogCard;
