import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import fetchData from "../../api";
import PostImg from "./components/PostImg";
import PostText from "./components/PostText";
import Comment from "./components/Comment";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getBook();
  }, [id]);

  const getBook = async () => {
    try {
      const postData = await fetchData("GET", `/posts/${id}`);
      setPost(postData);
      console.log(postData);
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  return !post ? (
    <Spinner />
  ) : (
    <div className="container py-10 m-auto">
      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-16 gap-8">
        <div className="lg:col-span-9">
          <PostImg data={post} />
          <PostText data={post} />
          <Comment post={post} getBook={getBook} />
        </div>
        <div className="lg:col-span-3">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl">{post.title}</h1>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 pt-8">
            asdasd
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
