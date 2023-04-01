import { useState, useEffect } from "react";
import styles from "./Explore.module.scss";
import classNames from "classnames/bind";
import AsideSuggested from "../Home/Aside/AsideSuggested";
import Post from "../../Components/Post/Post";
import { getSuggestedPost } from "../../Services/postService";

const cx = classNames.bind(styles);

const Explore = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchSuggestedPost = async () => {
      try {
        const res = await getSuggestedPost();
        setPosts(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestedPost();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("feed")}>
        <h2 className={cx("feed-title")}>Danh sách các bài viết nổi bật</h2>
        {posts.length > 0 &&
          posts.map((post) => (
            <Post key={post._id} data={post} currentUser={{}} />
          ))}
      </div>
      <div className={cx("aside")}>
        <AsideSuggested />
      </div>
    </div>
  );
};

export default Explore;
