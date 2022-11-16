import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneUser } from "../../Services/userService";
import noBackground from "../../Assets/images/noBackground.png";
import noAvatar from "../../Assets/images/noAvatar.png";
import { dataFriends } from "../../Utils/dataItem";
import { BsPersonCheckFill } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import ProfileIntro from "./ProfileIntro";
import ProfilePhotos from "./ProfilePhotos";
import ProfileFriends from "./ProfileFriends";
import Post from "../../Components/Post/Post";
import { AvatarGroup, CircularProgress } from "@mui/material";
import AvatarUser from "../../Components/Avatar/Avatar";
import classnames from "classnames/bind";
import styles from "./Profile.module.scss";
import { getPostsForUser } from "../../Features/postsForUserSlice";

const cx = classnames.bind(styles);
const ProfileUser = () => {
  const currentUser = useSelector((state) => state.user.data);
  const [infoUser, setInfoUser] = useState({});
  const posts = useSelector((state) => state.postsForUser.posts);
  const { userId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        dispatch(getPostsForUser(userId));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await getOneUser(userId);
        setInfoUser(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [currentUser._id, userId]);

  return (
    <div className={cx("wrapper")}>
      {!isLoading && (
        <div>
          <div className={cx("header")}>
            <div className={cx("header-background")}>
              <img
                src={infoUser.background ? infoUser.background : noBackground}
                alt="background"
              />
            </div>
            <div className={cx("header-body")}>
              <div className={cx("body-info")}>
                <div className={cx("avatar")}>
                  <img
                    src={infoUser.avatar ? infoUser.avatar : noAvatar}
                    alt="avatar"
                  />
                </div>
                <div className={cx("info-container")}>
                  <h4 className={cx("info-username")}>{infoUser.username}</h4>
                  <span className={cx("info-friends")}>
                    {`${infoUser.followers?.length}`} friends
                  </span>
                  <AvatarGroup max={8} className={cx("des-img")}>
                    {infoUser.followers.map((item) => (
                      <AvatarUser key={item} src={""} />
                    ))}
                  </AvatarGroup>
                </div>
              </div>
              <div className={cx("body-actions")}>
                <button className={cx("btn-actions")}>
                  <span className={cx("btn-icon")}>
                    <BsPersonCheckFill />
                  </span>
                  <span>Friends</span>
                </button>
                <button className={cx("btn-actions", "active")}>
                  <span className={cx("btn-icon")}>
                    <FaFacebookMessenger />
                  </span>
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
          <div className={cx("content")}>
            <div className={cx("content-aside")}>
              <ProfileIntro
                data={infoUser}
                currentUserId={currentUser._id}
                userId={userId}
              />
              <ProfilePhotos idUser={userId} />
              <ProfileFriends data={dataFriends} />
            </div>
            <div className={cx("content-body")}>
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Post
                    key={post._id}
                    data={post}
                    currentUser={currentUser}
                    avatar={currentUser.avatar}
                    isPageProfile={true}
                  />
                ))
              ) : (
                <p className={cx("content-no-post")}>There are no posts yet!</p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className={isLoading ? cx("loading", "active") : cx("loading")}>
        <CircularProgress size={30} />
      </div>
    </div>
  );
};

export default ProfileUser;
