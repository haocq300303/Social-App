import classnames from "classnames/bind";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountItem from "../../../Components/AcountItem/AccountItem";
import { getUserFollowers } from "../../../Services/userService";
import styles from "./Aside.module.scss";

const cx = classnames.bind(styles);
const AsideContact = () => {
  const [dataFriends, setDataFriends] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser.values);
  const isLogged = useSelector((state) => state.user.isLogged);

  useEffect(() => {
    if (isLogged) {
      const fetchUserFollowers = async () => {
        try {
          const res = await getUserFollowers(currentUser._id);
          setDataFriends(res);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserFollowers();
    }
  }, [currentUser._id, isLogged]);

  return (
    <div className={cx("contact")}>
      <div className={cx("aside-header")}>
        <h4>Contact</h4>
        <span>{(dataFriends && dataFriends.length) || 0}</span>
      </div>
      <div className={cx("contact-body")}>
        {dataFriends &&
          dataFriends.length > 0 &&
          dataFriends.map((item) => (
            <Link
              key={item._id}
              to={`/profileUser/${item._id}`}
              className={cx("account-item_link")}
            >
              <AccountItem
                avatar={item.avatar}
                username={item.username}
                isOnline={true}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AsideContact;
