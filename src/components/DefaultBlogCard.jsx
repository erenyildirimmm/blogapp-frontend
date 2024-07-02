import React from "react";
import CardBox from "./CardBox";
import { Link } from "react-router-dom";
import profilePic from "../assets/user.png";
import { useAuth } from "../provider/authProvider";
import PostOptions from "./PostOptions";

const DefaultBlogCard = ({ data, getUser }) => {
  const { userId } = useAuth();
  return (
    <CardBox className="relative h-72">
      <img
        src={`http://localhost:3001/${data.imageUrl}`}
        className="object-cover w-full rounded-tl-lg rounded-tr-lg h-36"
        alt=""
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Link to={`/books/${data._id}`}>
            <h2 className="font-bold text-xl hover:text-primary">
              {data.title}
            </h2>
          </Link>
          {data.creator._id == userId && <PostOptions data={data} getUser={getUser} />}
        </div>
        <Link to={`/profile/${data.creator._id}`}>
          <div className="absolute bottom-9 flex items-center gap-2">
            <img
              src={profilePic}
              className="w-5 h-5 rounded-full"
              alt="profile"
            />
            <span className="text-xs text-black/70">{data.creator.name}</span>
          </div>
        </Link>
      </div>
    </CardBox>
  );
};

export default DefaultBlogCard;
