import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import noBackground from "../../Assets/images/noBackground.png";
import noAvatar from "../../Assets/images/noAvatar.png";
import { MdAddCircle, MdEdit } from "react-icons/md";
import { dataFriends } from "../../Utils/dataItem";
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

const cx = classnames.bind(styles);
const Profile = () => {
  const currentUser = useSelector((state) => state.user.data);
  const isLoadingGetUser = useSelector((state) => state.user.isLoading);
  const posts = useSelector((state) => state.postsForUser.posts);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEditProfile, setOpenModalEditProfile] = useState(false);
  const dispatch = useDispatch();

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
      try {
        dispatch(getPostsForUser(currentUser._id));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [currentUser._id, dispatch]);

  return (
    <div className={cx("wrapper")}>
      {isLoadingGetUser === false && (
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
                    {`${currentUser.followers?.length}`} friends
                  </span>
                  <AvatarGroup max={8} className={cx("des-img")}>
                    {currentUser.followers.map((item) => (
                      <AvatarUser key={item} src={""} />
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
              <ProfileFriends data={dataFriends} />
            </div>
            <div className={cx("content-body")}>
              <div onClick={() => setOpenModal(true)}>
                <CreatePost
                  avatar={currentUser.avatar}
                  username={currentUser.username}
                />
              </div>
              {posts &&
                posts.length > 0 &&
                posts.map((post) => (
                  <Post
                    key={post._id}
                    data={post}
                    currentUser={currentUser}
                    avatar={currentUser.avatar}
                    isPageProfile={true}
                  />
                ))}
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
      <div
        className={isLoadingGetUser ? cx("loading", "active") : cx("loading")}
      >
        <CircularProgress size={30} />
      </div>
    </div>
  );
};

export default Profile;
