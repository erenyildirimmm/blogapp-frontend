import React, { useEffect, useState } from "react";
import { useAuth } from "../../../provider/authProvider";
import fetchData from "../../../api";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../ui/Input";
import { format, formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import profilePic from "../../../assets/user.png";
import Spinner from "../../../components/Spinner";
import { IoTrashOutline } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";
import Modal from "../../../ui/Modal";

const Comment = ({ post, getBook }) => {
  const navigate = useNavigate();
  const [selectedComment, setSelectedComment] = useState({
    action: "",
    status: false,
    comment: null,
  });
  const { userId, token } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);
  const handleCreateComment = async () => {
    if (!comment) {
      enqueueSnackbar("Göndermek istediğiniz yorumu ekleyin.", {
        variant: "warning",
        autoHideDuration: 1500,
      });
      return;
    }
    if (!userId) {
      enqueueSnackbar("Yorum yapabilmek için giriş yapmalısınız.", {
        variant: "warning",
        autoHideDuration: 1500,
      });
      navigate("/login");
      return;
    }
    const data = {
      userId: userId,
      postId: post._id,
      content: comment,
    };
    await fetchData("POST", "/comments", data);
    setComment("");
    enqueueSnackbar("Yorum gönderildi.", {
      variant: "success",
      autoHideDuration: 1500,
    });
    getBook();
    getComment();
  };
  const getComment = async () => {
    try {
      const comments = await fetchData("GET", `/comments/${post._id}`);
      console.log(comments);
      setComments(comments);
    } catch (error) {
      enqueueSnackbar("Yorumlar getirilemedi.", {
        variant: "danger",
        autoHideDuration: 1500,
      });
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetchData("DELETE", `/comments/${id}`);
      console.log(response);
      enqueueSnackbar("Yorum silindi.", {
        variant: "success",
        autoHideDuration: 1500,
      });
      clearSelectedComment();
      getComment();
      getBook();
    } catch (error) {
      enqueueSnackbar("Yorumlar silinemedi.", {
        variant: "danger",
        autoHideDuration: 1500,
      });
    }
  };
  const handleSelectedComment = (actionType, status, comment) => {
    setSelectedComment({
      action: actionType,
      status: status,
      comment: comment,
    });
  };
  const clearSelectedComment = () => {
    setSelectedComment({
      action: "",
      status: false,
      comment: null,
    });
  };
  useEffect(() => {
    getComment();
  }, []);
  return (
    <div className="mt-16">
      <div className="mb-3">
        <h5 className="text-xl">Yorumlar ({post.commentsCount})</h5>
      </div>
      <Input
        Tag="textarea"
        name="commentInput"
        rows="5"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="py-2 rounded-md  px-4 ml-auto mt-3 block bg-primary text-white"
        onClick={handleCreateComment}
      >
        Gönder
      </button>
      <div className="relative mt-6">
        {comments ? (
          <div>
            {comments
              .slice()
              .reverse()
              .map((comment, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm py-4 md:px-4 px-4 mt-8"
                >
                  <div className="flex justify-between">
                    <div key={index} className="flex items-center gap-2">
                      <Link to={`/profile`} className="flex items-center gap-2">
                        <img
                          src={profilePic}
                          className="w-6 h-6 rounded-full"
                          alt="profile"
                        />
                      </Link>
                      <div className="block gap-2">
                        <span className="text-sm block">
                          {comment.userId.name}
                        </span>
                        <span className="text-xs block text-gray-500">
                          {formatDistanceToNow(comment.createdAt, {
                            locale: tr,
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    {token && (
                      <div className="flex items-center gap-2">
                        {comment.userId._id == userId ? (
                          <div
                            className="flex items-center gap-1 text-red-600 cursor-pointer"
                            onClick={() =>
                              handleSelectedComment("delete", true, comment)
                            }
                          >
                            <IoTrashOutline size={14} />
                            <span className="text-xs">Sil</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-yellow-600 cursor-pointer">
                            <IoWarningOutline size={14} />
                            <span className="text-xs">Bildir</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                </div>
              ))}
            <Modal
              title="Yorumun Siliniyor"
              onClose={clearSelectedComment}
              isActive={selectedComment.status}
            >
              {selectedComment.comment && (
                <blockquote className="border-l-4 border-primary italic text-gray-600 pl-4">
                  "{selectedComment.comment.content}"{" "}
                </blockquote>
              )}
              <button
                className="py-2 rounded-md  px-4 ml-auto mt-4 block bg-red-500 text-white"
                onClick={() => handleDelete(selectedComment.comment._id)}
              >
                Sil
              </button>
            </Modal>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Comment;
