import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ModalPost from "../../../Components/Modal/ModalPost";
import CreatePost from "../../../Components/Create-post/CreatePost";
import Post from "../../../Components/Post/Post";
import Stories from "./Stories/Stories";
import CircularProgress from "@mui/material/CircularProgress";
import classnames from "classnames/bind";
import styles from "../Home.module.scss";

const cx = classnames.bind(styles);
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.user.value);
  const [open, setOpen] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  const fetchAPI = async (id) => {
    setLoadingPost(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/posts/timeline/all",
        { userId: id }
      );
      setPosts(res.data);
      setTimeout(() => {
        setLoadingPost(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPI(currentUser._id);
  }, [currentUser._id]);

  return (
    <div className={cx("feed")}>
      <div className={cx("stories")}>
        <Stories />
      </div>
      <div className={cx("create-post")} onClick={() => setOpen(true)}>
        <CreatePost avatar={currentUser.avatar} />
      </div>
      <div className={cx("posts")}>
        {!loadingPost &&
          posts.map((post) => <Post key={post._id} data={post} />)}
      </div>
      {open && (
        <ModalPost open={open} setOpen={setOpen} avatar={currentUser.avatar} />
      )}
      <div className={loadingPost ? cx("loading", "active") : cx("loading")}>
        <CircularProgress size={30} />
      </div>
    </div>
  );
};

export default Feed;
