import classnames from "classnames/bind";
import AccountItem from "../../../Components/AcountItem/AccountItem";
import styles from "./Aside.module.scss";

const cx = classnames.bind(styles);
const AsideContact = () => {
  return (
    <div className={cx("contact")}>
      <div className={cx("aside-header")}>
        <h4>Contact</h4>
        <span>8</span>
      </div>
      <div className={cx("contact-body")}>
        <AccountItem avatar="" username="Hao Quang Chu" isOnline={true} />
        <AccountItem avatar="" username="Hanh Le" isOnline={true} />
        <AccountItem avatar="" username="Hung Manh" isOnline={true} />
        <AccountItem avatar="" username="Duong Manh Dat" isOnline={true} />
        <AccountItem avatar="" username="Duong Manh Dat" isOnline={true} />
        <AccountItem avatar="" username="Duong Manh Dat" isOnline={true} />
        <AccountItem avatar="" username="Duong Manh Dat" isOnline={true} />
        <AccountItem avatar="" username="Duong Manh Dat" isOnline={true} />
      </div>
    </div>
  );
};

export default AsideContact;
