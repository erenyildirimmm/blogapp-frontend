import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import fetchData from "../../api";
import PostImg from "./components/PostImg";
import PostText from "./components/PostText";
import Comment from "./components/Comment";
import DefaultBlogCard from "../../components/DefaultBlogCard";
import { enqueueSnackbar } from "notistack";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getBook();
  }, [id]);

  useEffect(() => {
    if (post) {
      getRelatedPosts();
    }
  }, [post]);

  const getBook = async () => {
    console.log(id);
    try {
      const data = await fetchData("GET", `/posts/detail/${id}`);
      setPost(data);
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  const getRelatedPosts = async () => {
    setLoadingRelated(true);
    try {
      const response = await fetchData(
        "GET",
        `/posts/related/${id}?category=${post.category._id}&limit=5`
      );
      console.log(response.data);
      setRelatedPosts(response.data);
    } catch (error) {
      console.log(error);
      setLoadingRelated(false);
    } finally {
      setLoadingRelated(false);
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
            <h1 className="text-2xl font-semibold">Benzer İçerikler</h1>
          </div>
          <div className="grid lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-4 pt-8">
            {!loadingRelated ? (
              relatedPosts.length > 0 ? 
              relatedPosts.map((post) => <DefaultBlogCard data={post} />) : <div>Benzer içerik bulunamadı</div>
            ) : (
              <div className="relative">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
