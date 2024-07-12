import React from "react";
import CardBox from "../../../components/CardBox";
import profilePic from "../../../assets/user.png";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { useAuth } from "../../../provider/authProvider";
import PostOptions from "../../../components/PostOptions";

const Post = ({ postOrder = 1, data }) => {
  const { userId } = useAuth();
  console.log(data);
  return postOrder === 1 ? (
    <CardBox className="grid md:grid-cols-2 h-72 relative">
      <div className="md:block hidden">
        <img
          src={`http://localhost:3001/${data.imageUrl}`}
          className="object-cover w-full rounded-tl-lg rounded-bl-lg h-72"
          alt=""
        />
      </div>
      <div className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <Link to={`/books/${data.slug}`}>
            <h2 className="font-bold text-2xl hover:text-primary">
              {data.title}
            </h2>
          </Link>
          {data.creator._id == userId && (
            <PostOptions data={data} className="w-7 h-7"  />
          )}
        </div>
        <p
          className="max-w-400px overflow-hidden line-clamp-5 mb-16"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></p>
        <Link to={`/users/${data.creator.username}`}>
          <div className="absolute bottom-9 flex items-center gap-2">
            <img
              src={profilePic}
              className="w-5 h-5 rounded-full"
              alt="profile"
            />
            <span className="text-xs text-black/70">{data.creator.fullName}</span>
          </div>
        </Link>
        <div className="absolute bottom-3 right-3 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <FaRegHeart size={10} />
            <span className="text-xs">{data.likesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegCommentDots size={10} />
            <span className="text-xs">{data.commentsCount}</span>
          </div>
        </div>
      </div>
    </CardBox>
  ) : postOrder === 2 ? (
    <CardBox className="relative after:absolute after:bg-black/40 after:left-0 after:top-0 after:content-[''] after:w-full after:h-full after:rounded-lg  h-72">
      <div className="absolute top-0 left-0 p-6 z-10 w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <Link to={`/books/${data.slug}`}>
            <h2 className="font-bold text-2xl text-white hover:text-primary">
              {data.title}
            </h2>
          </Link>
          {data.creator._id == userId && (
            <PostOptions data={data} className="w-7 h-7"  />
          )}
        </div>
        <Link to={`/users/${data.creator.username}`}>
          <div className="absolute bottom-9 flex items-center gap-2">
            <img
              src={profilePic}
              className="w-5 h-5 rounded-full"
              alt="profile"
            />
            <span className="text-xs text-white">{data.creator.fullName}</span>
          </div>
        </Link>
        <div className="absolute bottom-3 right-3 flex items-center gap-3 z-10 text-white">
          <div className="flex items-center gap-1">
            <FaRegHeart size={10} />
            <span className="text-xs">{data.likesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegCommentDots size={10} />
            <span className="text-xs">{data.commentsCount}</span>
          </div>
        </div>
      </div>
      <img
        src={`http://localhost:3001/${data.imageUrl}`}
        className="object-cover w-full rounded-tl-lg rounded-lg h-72"
        alt=""
      />
    </CardBox>
  ) : postOrder === 3 ? (
    <CardBox className="relative h-72">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Link to={`/books/${data.slug}`}>
            <h2 className="font-bold text-2xl hover:text-primary mb-4">
              {data.title}
            </h2>
          </Link>
          {data.creator._id == userId && (
            <PostOptions data={data} className="w-7 h-7"  />
          )}
        </div>
        <p
          className="max-w-400px overflow-hidden line-clamp-5 mb-16"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></p>
        <Link to={`/users/${data.creator.username}`}>
          <div className="absolute bottom-9 flex items-center gap-2">
            <img
              src={profilePic}
              className="w-5 h-5 rounded-full"
              alt="profile"
            />
            <span className="text-xs text-black/70">{data.creator.fullName}</span>
          </div>
        </Link>
        <div className="absolute bottom-3 right-3 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <FaRegHeart size={10} />
            <span className="text-xs">{data.likesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegCommentDots size={10} />
            <span className="text-xs">{data.commentsCount}</span>
          </div>
        </div>
      </div>
    </CardBox>
  ) : postOrder === 4 ? (
    <CardBox className="relative h-72">
      <img
        src={`http://localhost:3001/${data.imageUrl}`}
        className="object-cover w-full rounded-tl-lg rounded-tr-lg h-36"
        alt=""
      />
      <div className="p-6">
        <Link to={`/books/${data.slug}`}>
          <h2 className="font-bold text-2xl hover:text-primary mb-4">
            {data.title}
          </h2>
        </Link>
        <Link to={`/users/${data.creator.username}`}>
          <div className="absolute bottom-9 flex items-center gap-2">
            <img
              src={profilePic}
              className="w-5 h-5 rounded-full"
              alt="profile"
            />
            <span className="text-xs text-black/70">{data.creator.fullName}</span>
          </div>
        </Link>
        <div className="absolute bottom-3 right-3 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <FaRegHeart size={10} />
            <span className="text-xs">{data.likesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegCommentDots size={10} />
            <span className="text-xs">{data.commentsCount}</span>
          </div>
        </div>
      </div>
    </CardBox>
  ) : (
    <CardBox className="relative h-72">
      <div className="p-6">
        <Link to={`/books/${data.slug}`}>
          <h2 className="font-bold text-2xl hover:text-primary mb-4">
            {data.title}
          </h2>
        </Link>
        <p
          className="max-w-400px overflow-hidden line-clamp-5 mb-16"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></p>
        <Link to={`/users/${data.creator.username}`}>
          <div className="absolute bottom-9 flex items-center gap-2">
            <img
              src={profilePic}
              className="w-5 h-5 rounded-full"
              alt="profile"
            />
            <span className="text-xs text-black/70">{data.creator.fullName}</span>
          </div>
        </Link>
        <div className="absolute bottom-3 right-3 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <FaRegHeart size={10} />
            <span className="text-xs">{data.likesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegCommentDots size={10} />
            <span className="text-xs">{data.commentsCount}</span>
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default Post;
