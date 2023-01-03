import axios from "../Utils/axiosCustomize";
import { v4 as uuidv4 } from "uuid";

const createComment = (idPost, userId, content) => {
  return axios.post("/api/comments", {
    idPost,
    userId,
    content,
  });
};

const createReply = (idComment, userId, content) => {
  return axios.post(`/api/comments/reply/${idComment}`, {
    idReply: uuidv4(),
    userId,
    content,
  });
};

const getAllComment = (idPost) => {
  return axios.get(`/api/comments/all/${idPost}`);
};

const getAllReplyForOneComment = (idComment) => {
  return axios.get(`/api/comments/${idComment}/reply`);
};

const getOneComment = (id) => {
  return axios.get(`/api/comments/${id}`);
};

const deleteComment = (idComment, idCurrentUser, idAdminPost, userId) => {
  return axios.delete(`/api/comments/${idComment}`, {
    data: {
      idCurrentUser,
      idAdminPost,
      userId,
    },
  });
};

const deleteReply = (
  idComment,
  idCurrentUser,
  idAdminPost,
  userId,
  idReply
) => {
  return axios.delete(`/api/comments/reply/${idComment}`, {
    data: {
      idCurrentUser,
      idAdminPost,
      userId,
      idReply,
    },
  });
};

const ChangeLikeComment = (idComment, userId) => {
  return axios.put(`/api/comments/${idComment}/like`, {
    userId,
  });
};

const deleteAllCommentForPost = (idPost) => {
  return axios.delete(`/api/comments/delete/all`, {
    data: {
      idPost,
    },
  });
};

export {
  createComment,
  createReply,
  getAllComment,
  deleteComment,
  deleteReply,
  getOneComment,
  getAllReplyForOneComment,
  ChangeLikeComment,
  deleteAllCommentForPost,
};
