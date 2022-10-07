import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import noBackground from "../../Assets/images/noBackground.png";
import noAvatar from "../../Assets/images/noAvatar.png";
import { MdAddCircle, MdEdit } from "react-icons/md";
import { dataFriends } from "../../Utils/dataFriends";

import ProfileIntro from "./ProfileIntro";
import ProfilePhotos from "./ProfilePhotos";
import ProfileFriends from "./ProfileFriends";
import CreatePost from "../../Components/Create-post/CreatePost";
import Post from "../../Components/Post/Post";
import classnames from "classnames/bind";
import styles from "./Profile.module.scss";
import ModalPost from "../../Components/Modal/ModalPost";
import { CircularProgress } from "@mui/material";

const cx = classnames.bind(styles);
const Profile = () => {
  const [infoUser, setInfoUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/api/users/${userId}`
        );
        setInfoUser(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/posts/personal/${userId}`
        );
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
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
                    {`${infoUser.followers?.length}`} friends
                  </span>
                  <div className={cx("des-img")}>
                    <img
                      src="https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-1/37382997_274458256638364_1437840907649941504_n.jpg?stp=cp0_dst-jpg_p48x48&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_ohc=jFLpO5hscJ8AX-ewQPz&tn=NwEmhSQ6a3KC5tSx&_nc_ht=scontent.fhan2-2.fna&oh=00_AT-aDWgyVDm-1Ib_4kSnyxAl7NL7NqQoXkUywpM5FuIGrg&oe=634EB27B"
                      alt="avt-friends"
                    />
                    <img
                      src="https://scontent.fhan14-1.fna.fbcdn.net/v/t1.18169-1/12274286_181792752163975_1966852123273335843_n.jpg?stp=cp0_dst-jpg_p48x48&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Izy_E6bUw4gAX-GdIB3&_nc_ht=scontent.fhan14-1.fna&oh=00_AT-tnxW8uQbGBTMG7dR0Sf3g_5zd3hWgKEvOeRmJEhACiQ&oe=634E1632"
                      alt="avt-friends"
                    />
                    <img
                      src="https://scontent.fhan14-1.fna.fbcdn.net/v/t1.18169-1/12105923_1503198846667656_7933251989786713552_n.jpg?stp=cp0_dst-jpg_p48x48&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=_OmomWMVGxEAX9VAC9r&_nc_ht=scontent.fhan14-1.fna&oh=00_AT8ObHRbA9P-JsQEFg6s7VaysuZJwMtWRySMzKaPzQUUGA&oe=634EFEDE"
                      alt="avt-friends"
                    />
                    <img
                      src="https://scontent.fhan2-3.fna.fbcdn.net/v/t1.18169-1/6428_1536731963310310_6543800424381582961_n.jpg?stp=cp0_dst-jpg_p48x48&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=J82iij3OtR4AX_y1wF7&_nc_ht=scontent.fhan2-3.fna&oh=00_AT9RKE1-cbmqXUHrchWm9t_30U6dNAKjnbNLkm97vF5vlg&oe=634E7B88"
                      alt="avt-friends"
                    />
                    <img
                      src="https://scontent.fhan2-5.fna.fbcdn.net/v/t1.18169-1/21765270_292218407922848_7590581853939672508_n.jpg?stp=cp0_dst-jpg_p48x48&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=fPwSIp5VBcoAX-Gfn1p&_nc_ht=scontent.fhan2-5.fna&oh=00_AT_XW99U-I_Xs99rzCPK6M9qJwE3yuTbaF7oWDPy7y-Ezg&oe=634C2B7A"
                      alt="avt-friends"
                    />
                    <img
                      src="https://scontent.fhan2-5.fna.fbcdn.net/v/t1.6435-1/100087359_161972775313895_4751393565035200512_n.jpg?stp=cp0_dst-jpg_p48x48&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OWk9CCahKXUAX9R-xF7&_nc_ht=scontent.fhan2-5.fna&oh=00_AT92vL6hjI4p28eGGJo_pPEtY8OEFE7mQLoQSWF85ju_sw&oe=634DBF58"
                      alt="avt-friends"
                    />
                    <img
                      src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/295986340_776504713544563_8403894697475498125_n.jpg?stp=cp0_dst-jpg_p48x48&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=roSCiaYfFSkAX9AWnJi&_nc_ht=scontent.fhan14-1.fna&oh=00_AT-a1mDbhm596eb8u-oN9GT8TFv62ODlt4ppWMO7GFIDgA&oe=632D7F98"
                      alt="avt-friends"
                    />
                    <img
                      src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/295086539_1768794513466701_1229384273892606441_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=D5LuKL2aCpMAX-QClUY&_nc_ht=scontent.fhan14-1.fna&oh=00_AT8MpeVLeFfWe5o6_nyXXkq7QA6gX_tI5HC2ji8o3l006w&oe=632D900F"
                      alt="avt-friends"
                    />
                  </div>
                </div>
              </div>
              <div className={cx("body-actions")}>
                <button className={cx("btn-add-story")}>
                  <span className={cx("btn-icon")}>
                    <MdAddCircle />
                  </span>
                  <span>Add to story</span>
                </button>
                <button className={cx("btn-edit-profile")}>
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
              <ProfileIntro data={infoUser} />
              <ProfilePhotos />
              <ProfileFriends data={dataFriends} />
            </div>
            <div className={cx("content-body")}>
              {currentUser._id === userId ? (
                <div onClick={() => setOpenModal(true)}>
                  <CreatePost
                    avatar={infoUser.avatar}
                    username={infoUser.username}
                  />
                </div>
              ) : (
                ""
              )}
              {posts.map((post) => (
                <Post
                  key={post._id}
                  data={post}
                  currentUserId={currentUser._id}
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
          avatar={infoUser.avatar}
          username={infoUser.username}
          typeCreate={true}
        />
      )}
      <div className={isLoading ? cx("loading", "active") : cx("loading")}>
        <CircularProgress size={30} />
      </div>
    </div>
  );
};

export default Profile;
