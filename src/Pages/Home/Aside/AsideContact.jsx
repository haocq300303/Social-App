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
        <AccountItem online={true} avatar="" username="Hao Quang Chu" />
        <AccountItem online={true} avatar="" username="Hanh Le" />
        <AccountItem online={true} avatar="" username="Hung Manh" />
        <AccountItem online={true} avatar="" username="Duong Manh Dat" />
      </div>
    </div>
  );
};

export default AsideContact;
