import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import fetchData from "../api";
import { enqueueSnackbar } from "notistack";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const getPosts = async (reset = false ) => {
    try {
      let url = `/posts/${category ? category : "all"}/${search ? search : "all"}/${
        reset ? 1 : page
      }?limit=10`;
      url += `${reset ? 1 : page}?limit=10`;
      const response = await fetchData("GET", url);
      let newPosts = response.data.filter(
        (newPost) => !posts.some((post) => post._id === newPost._id)
      );
      setPosts((prevPosts) =>
        reset ? response.data : [...prevPosts, ...newPosts]
      );
      setHasMore(response.data.length >= 10);
      if (reset) setPage(1);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const resetPosts = async () => {
    await getPosts(true);
  };

  useEffect(() => {
    if (page > 1) {
      getPosts();
    }
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await fetchData("DELETE", `/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      enqueueSnackbar("Gönderi silindi.", {
        variant: "success",
        autoHideDuration: 1500,
      });
    } catch (error) {
      enqueueSnackbar("Gönderi silinemedi.", {
        variant: "danger",
        autoHideDuration: 1500,
      });
    }
  };

  const value = useMemo(
    () => ({
      posts,
      setPosts,
      getPosts,
      handleDelete,
      setPage,
      hasMore,
      page,
      loading,
      search,
      setLoading,
      resetPosts,
      setSearch,
      setCategory,
    }),
    [posts, getPosts, handleDelete, setPage, hasMore, page]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePost = () => {
  return useContext(PostContext);
};

export default PostProvider;
