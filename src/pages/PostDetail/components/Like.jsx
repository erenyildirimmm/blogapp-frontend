import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../../provider/authProvider";
import fetchData from "../../../api";
import { enqueueSnackbar } from "notistack";
const Like = ({ postId }) => {
  const [isLike, setIsLike] = useState(false);
  const { userId } = useAuth();
  useEffect(() => {
    fetchLikeData();
  }, [userId, postId]);
  const fetchLikeData = async () => {
    try {
      const likeStatusResponse = await fetchData(
        "GET",
        "/likes/isLiked",
        null,
        { userId, postId }
      );
      setIsLike(likeStatusResponse.isLiked);
      console.log(likeStatusResponse.isLiked);
    } catch (error) {
      enqueueSnackbar("Beğeni verileri alınamadı", {
        variant: "danger",
        autoHideDuration: 1500,
      });
    }
  };
  const handleLike = async () => {
    try {
      if (isLike) {
        await fetchData("POST", "/likes/remove", {
          userId: userId,
          postId: postId,
        });
      } else {
        await fetchData("POST", "/likes/add", {
          userId: userId,
          postId: postId,
        });
      }
      setIsLike((prev) => !prev);
    } catch (error) {
      enqueueSnackbar("Gönderi beğenilemedi.", {
        variant: "danger",
        autoHideDuration: 1500,
      });
    }
  };
  return (
    <div className="sm:w-12 sm:h-12 h-8 w-8 flex items-center justify-center  bg-gray-600/60 rounded-full">
      {isLike ? (
        <FaHeart
          className="text-red-500 cursor-pointer sm:text-2xl text-md"
          onClick={handleLike}
        />
      ) : (
        <FaRegHeart
          className="text-white cursor-pointer sm:text-2xl text-md"
          onClick={handleLike}
        />
      )}
    </div>
  );
};

export default Like;
