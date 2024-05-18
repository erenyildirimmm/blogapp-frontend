import React from 'react'
import CardBox from './CardBox';
import { Link } from 'react-router-dom';
import profilePic from "../assets/user.png";

const DefaultBlogCard = ({data}) => {
  return (
    <CardBox className="relative h-72">
      <img
        src={`http://localhost:3001/${data.imageUrl}`}
        className="object-cover w-full rounded-tl-lg rounded-tr-lg h-36"
        alt=""
      />
      <div className="p-6">
        <Link to={`/books/${data._id}`}>
          <h2 className="font-bold text-2xl hover:text-primary mb-4">
            {data.title}
          </h2>
        </Link>
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
}

export default DefaultBlogCard;