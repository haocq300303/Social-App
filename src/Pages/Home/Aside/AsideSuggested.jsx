import classnames from "classnames/bind";
import { useState, useEffect } from "react";
import AccountItem from "../../../Components/AcountItem/AccountItem";
import ModalLogin from "../../../Components/Modal/ModalLogin/ModalLogin";
import { getUserSuggested } from "../../../Services/userService";
import styles from "./Aside.module.scss";

const cx = classnames.bind(styles);
const AsideSuggested = () => {
  const [dataSuggested, setDataSuggested] = useState([]);
  const [openModalLogin, setOpenModalLogin] = useState(false);

  useEffect(() => {
    const fetchUserSuggested = async () => {
      try {
        const res = await getUserSuggested();
        setDataSuggested(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserSuggested();
  }, []);

  return (
    <div className={cx("suggested")}>
      <div className={cx("aside-header")}>
        <h4>Suggested for you</h4>
        <span>{dataSuggested && dataSuggested.length}</span>
      </div>
      <div className={cx("suggested-body")}>
        {dataSuggested &&
          dataSuggested.length > 0 &&
          dataSuggested?.map((item) => (
            <AccountItem
              key={item._id}
              idUser={item._id}
              avatar={item.avatar}
              username={item.username}
              subName={item.email}
              isFollow={true}
              setOpenModalLogin={setOpenModalLogin}
            />
          ))}
      </div>
      {openModalLogin && (
        <ModalLogin show={openModalLogin} setShow={setOpenModalLogin} />
      )}
    </div>
  );
};

export default AsideSuggested;
