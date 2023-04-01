import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import noBackground from "../../Assets/images/noBackground.png";
import noAvatar from "../../Assets/images/noAvatar.png";
import { MdAddCircle, MdEdit } from "react-icons/md";
import { BsFillCameraFill } from "react-icons/bs";
import ProfileIntro from "./ProfileIntro";
import ProfilePhotos from "./ProfilePhotos";
import ProfileFriends from "./ProfileFriends";
import CreatePost from "../../Components/Create-post/CreatePost";
import Post from "../../Components/Post/Post";
import { AvatarGroup, CircularProgress } from "@mui/material";
import ModalEditProfile from "../../Components/Modal/ModalEditProfile/ModalEditProfile";
import AvatarUser from "../../Components/Avatar/Avatar";
import ModalPost from "../../Components/Modal/ModalPost/ModalPost";
import classnames from "classnames/bind";
import styles from "./Profile.module.scss";
import { getPostsForUser } from "../../Features/postsForUserSlice";
import { getUserFollowers } from "../../Services/userService";
import InfoUser from "../../Components/Popper/InfoUser/InfoUser";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);
const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser.values);
  const [isLoading, setIsLoading] = useState(true);
  const posts = useSelector((state) => state.postsForUser.posts);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEditProfile, setOpenModalEditProfile] = useState(false);
  const dispatch = useDispatch();
  const [dataFollowers, setDataFollowers] = useState([]);

  // handle edit profile
  const [siteEdit, setSiteEdit] = useState([
    {
      title: "Profile",
      component: "MainSite",
    },
  ]);

  const currentSite = siteEdit[siteEdit.length - 1];

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        dispatch(getPostsForUser(currentUser._id));
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [currentUser._id, dispatch]);

  useEffect(() => {
    const fetchUserFollowers = async () => {
      try {
        const res = await getUserFollowers(currentUser._id);
        setDataFollowers(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserFollowers();
  }, [currentUser._id]);

  return (
    <div className={cx("wrapper")}>
      {isLoading === false && (
        <div>
          <div className={cx("header")}>
            <div className={cx("header-background")}>
              <img
                src={
                  currentUser.background ? currentUser.background : noBackground
                }
                alt="background"
              />
              <div
                className={cx("icon-edit-coverphoto")}
                onClick={() => {
                  setOpenModalEditProfile(true);
                  setSiteEdit((prev) => [
                    ...prev,
                    {
                      title: "Cover Photo",
                      component: "SiteEditCoverPhoto",
                    },
                  ]);
                }}
              >
                <span className={cx("icon-camera")}>
                  <BsFillCameraFill />
                </span>
                <span>Edit cover photo</span>
              </div>
            </div>
            <div className={cx("header-body")}>
              <div className={cx("body-info")}>
                <div className={cx("avatar")}>
                  <img
                    src={currentUser.avatar ? currentUser.avatar : noAvatar}
                    alt="avatar"
                  />
                  <div
                    className={cx("icon-edit-avatar")}
                    onClick={() => {
                      setOpenModalEditProfile(true);
                      setSiteEdit((prev) => [
                        ...prev,
                        {
                          title: "Profile Picture",
                          component: "SiteEditProfilePicture",
                        },
                      ]);
                    }}
                  >
                    <BsFillCameraFill />
                  </div>
                </div>
                <div className={cx("info-container")}>
                  <h4 className={cx("info-username")}>
                    {currentUser.username}
                  </h4>
                  <span className={cx("info-friends")}>
                    {`${currentUser.followers?.length}`} followers
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
                <button className={cx("btn-actions", "active")}>
                  <span className={cx("btn-icon")}>
                    <MdAddCircle />
                  </span>
                  <span>Add to story</span>
                </button>
                <button
                  className={cx("btn-actions")}
                  onClick={() => setOpenModalEditProfile(true)}
                >
                  <span className={cx("btn-icon")}>
                    <MdEdit />
                  </span>
                  <span>Edit profile</span>
                </button>
              </div>
            </div>
          </div>
          <div className={cx("content")}>
            <div className={cx("content-aside")}>
              <ProfileIntro
                data={currentUser}
                setSite={setSiteEdit}
                setOpenModalEditProfile={setOpenModalEditProfile}
                currentUserId={currentUser._id}
                userId={currentUser._id}
              />
              <ProfilePhotos idUser={currentUser._id} />
              <ProfileFriends
                data={dataFollowers}
                currentUserId={currentUser._id}
              />
            </div>
            <div className={cx("content-body")}>
              <div onClick={() => setOpenModal(true)}>
                <CreatePost
                  avatar={currentUser.avatar}
                  username={currentUser.username}
                />
              </div>
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Post key={post._id} data={post} isPageProfile={true} />
                ))
              ) : (
                <p className={cx("content-no-post")}>There are no posts yet!</p>
              )}
            </div>
          </div>
        </div>
      )}
      {openModal && (
        <ModalPost
          open={openModal}
          setOpen={setOpenModal}
          avatar={currentUser.avatar}
          userId={currentUser._id}
          username={currentUser.username}
          typeCreate={true}
          isPageProfile={true}
        />
      )}
      {openModalEditProfile && (
        <ModalEditProfile
          open={openModalEditProfile}
          setOpen={setOpenModalEditProfile}
          setSite={setSiteEdit}
          currentSite={currentSite}
        />
      )}
      <div className={isLoading ? cx("loading", "active") : cx("loading")}>
        <CircularProgress size={30} />
      </div>
    </div>
  );
};

export default Profile;
