import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneUser, getUserFollowers } from "../../Services/userService";
import noBackground from "../../Assets/images/noBackground.png";
import noAvatar from "../../Assets/images/noAvatar.png";
import { BsPersonCheckFill, BsPersonPlusFill } from "react-icons/bs";
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
import InfoUser from "../../Components/Popper/InfoUser/InfoUser";

const cx = classnames.bind(styles);
const ProfileUser = () => {
  const currentUser = useSelector((state) => state.user.currentUser.values);
  const [infoUser, setInfoUser] = useState({});
  const posts = useSelector((state) => state.postsForUser.posts);
  const { userId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [dataFollowers, setDataFollowers] = useState([]);

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

  useEffect(() => {
    const fetchUserFollowers = async () => {
      try {
        const res = await getUserFollowers(userId);
        setDataFollowers(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserFollowers();
  }, [userId]);

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
                    {`${infoUser.followers?.length}`} followers
                  </span>
                  <AvatarGroup max={8} className={cx("des-img")}>
                    {dataFollowers &&
                      dataFollowers.length > 0 &&
                      dataFollowers.map((item) => (
                        <InfoUser key={item._id} data={item}>
                          <Link
                            to={
                              currentUser._id === item._id
                                ? `/profile`
                                : `/profileUser/${item._id}`
                            }
                          >
                            <AvatarUser src={item.avatar} />
                          </Link>
                        </InfoUser>
                      ))}
                  </AvatarGroup>
                </div>
              </div>
              <div className={cx("body-actions")}>
                <button className={cx("btn-actions")}>
                  {currentUser?.followings?.includes(userId) ? (
                    <>
                      <span className={cx("btn-icon")}>
                        <BsPersonCheckFill />
                      </span>
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <span className={cx("btn-icon")}>
                        <BsPersonPlusFill />
                      </span>
                      <span>Follow</span>
                    </>
                  )}
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
              <ProfileFriends
                data={dataFollowers}
                currentUserId={currentUser._id}
              />
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
