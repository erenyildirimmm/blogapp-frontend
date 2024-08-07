import React, { useEffect, useState } from "react";
import Container from "../../ui/Container";
import Spinner from "../../components/Spinner";
import Section from "../../ui/Section";
import Post from "./components/Post";
import { usePost } from "../../provider/postProvider";
import { useLocation } from "react-router-dom";
import PostFilters from "../../components/PostFilters";

const Home = () => {
  const {
    posts,
    hasMore,
    setLoading,
    setPage,
    loading,
    resetPosts,
    search
  } = usePost();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    resetPosts();
  }, [location.pathname, search]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Container>
      <PostFilters/>
      {loading ? (
        <Spinner />
      ) : (
        <Section>
          <div className="grid md:grid-cols-12 sm:grid-cols-2 grid-cols-1 md:gap-10 gap-8">
            {posts.map((post, index) => {
              const postOrder = (index % 5) + 1;
              return (
                <div
                  key={post._id}
                  className={
                    postOrder === 1 ? "md:col-span-8" : "md:col-span-4"
                  }
                >
                  <Post data={post} postOrder={postOrder} />
                </div>
              );
            })}
          </div>
          {hasMore && (
            <button
              onClick={handleShowMore}
              className="px-8 py-2 border border-primary rounded-md m-2 cursor-pointer duration-100 hover:bg-primary hover:text-white flex mx-auto my-8"
            >
              Show more
            </button>
          )}
        </Section>
      )}
    </Container>
  );
};

export default Home;
