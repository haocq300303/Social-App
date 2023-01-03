import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../../Features/postsSlice";
import { useLocation } from "react-router-dom";
import CreatePost from "../../../Components/Create-post/CreatePost";
import Post from "../../../Components/Post/Post";
import Stories from "./Stories/Stories";
import CircularProgress from "@mui/material/CircularProgress";
import classnames from "classnames/bind";
import styles from "../Home.module.scss";
import ModalPost from "../../../Components/Modal/ModalPost/ModalPost";

const cx = classnames.bind(styles);
const Feed = () => {
  const currentUser = useSelector((state) => state.user.currentUser.values);
  const isLogged = useSelector((state) => state.user.isLogged);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const dispatch = useDispatch();
  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    if (isLogged === true && url === "/") {
      dispatch(getPosts(currentUser._id));
    }
  }, [dispatch, currentUser._id, isLogged, url]);

  return (
    <div className={cx("feed")}>
      <div className={cx("stories")}>
        <Stories />
      </div>
      <div
        className={cx("create-post")}
        onClick={() => setOpenModalCreate(true)}
      >
        <CreatePost
          avatar={currentUser.avatar}
          username={currentUser.username}
        />
      </div>
      {!isLoading && (
        <div className={cx("posts")}>
          {posts && posts.length > 0
            ? posts.map((post) => (
                <Post key={post._id} data={post} currentUser={currentUser} />
              ))
            : ""}
        </div>
      )}
      {openModalCreate && (
        <ModalPost
          open={openModalCreate}
          setOpen={setOpenModalCreate}
          userId={currentUser._id}
          username={currentUser.username}
          avatar={currentUser.avatar}
        />
      )}
      <div className={isLoading ? cx("loading", "active") : cx("loading")}>
        <CircularProgress size={30} />
      </div>
    </div>
  );
};

export default Feed;
