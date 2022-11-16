import axios from "../Utils/axiosCustomize";

const register = (data) => {
  return axios.post("/api/auth/register", data);
};

const login = (data) => {
  return axios.post("/api/auth/login", data);
};

const getOneUser = (params) => {
  return axios.get(`/api/users/${params}`);
};

const searchUser = (params) => {
  return axios.get(`/api/users/search/${params}`);
};

const editAvatar = (userId, image) => {
  return axios.put(`/api/users/${userId}`, {
    userId,
    avatar: image,
  });
};

const editCoverPhoto = (userId, image) => {
  return axios.put(`/api/users/${userId}`, {
    userId,
    background: image,
  });
};

const editIntro = (userId, city, from, desc, birthday, gender) => {
  return axios.put(`/api/users/${userId}`, {
    userId,
    city,
    from,
    desc,
    date_of_birth: birthday,
    gender,
  });
};

export {
  register,
  login,
  getOneUser,
  searchUser,
  editAvatar,
  editCoverPhoto,
  editIntro,
};
