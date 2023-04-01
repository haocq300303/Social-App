import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-socialapp.vercel.app",
});

instance.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem("accessToken")) {
      config.headers.Token = `Bearer ${localStorage.getItem("accessToken")}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response && response.data ? response.data : response;
  },
  function (error) {
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
