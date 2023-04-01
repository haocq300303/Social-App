import axios from "../Utils/axiosCustomize";

const getAllPost = (userId) => {
  return axios.post("/api/posts/timeline/all", {
    userId: userId,
  });
};

const createPost = (userId, desc, image) => {
  return axios.post("/api/posts", {
    userId,
    desc,
    image,
  });
};

const updatePost = (idPost, userId, desc, image) => {
  return axios.put(`/api/posts/${idPost}`, {
    userId,
    desc,
    image,
  });
};

const getOnePost = (id) => {
  return axios.get(`/api/posts/${id}`);
};

const likePost = (id, userId) => {
  return axios.put(`/api/posts/${id}/like`, {
    userId,
  });
};

const deletePost = (id, userId) => {
  return axios.delete(`/api/posts/${id}`, {
    data: {
      userId,
    },
  });
};

const uploadImage = (data) => {
  return axios.post(
    "https://api.cloudinary.com/v1_1/dsvfqgd20/image/upload",
    data,
    {
      transformRequest: (data, headers) => {
        delete headers.Token;
        return data;
      },
    }
  );
};

const getAllPostForOneUser = (userId) => {
  return axios.get(`/api/posts/all/${userId}`);
};

const getAllImage = (idUser) => {
  return axios.get(`/api/posts/images/${idUser}`);
};

const getSuggestedPost = () => {
  return axios.get("api/posts/suggested/all");
};

export {
  getAllPost,
  getOnePost,
  likePost,
  deletePost,
  createPost,
  updatePost,
  uploadImage,
  getAllPostForOneUser,
  getAllImage,
  getSuggestedPost,
};
