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
    <div className="w-12 h-12 flex items-center justify-center  bg-gray-600/60 rounded-full absolute top-4 right-4 z-10">
      {isLike ? (
        <FaHeart
          className="text-red-500 cursor-pointer"
          onClick={handleLike}
          size={25}
        />
      ) : (
        <FaRegHeart
          className="text-white cursor-pointer"
          onClick={handleLike}
          size={25}
        />
      )}
    </div>
  );
};

export default Like;
