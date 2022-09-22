import Aside from "./Aside/Aside";
import Feed from "./Feed/Feed";
import classnames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classnames.bind(styles);
const Home = () => {
  return (
    <div className={cx("wrapper")}>
      <Feed />
      <Aside />
    </div>
  );
};

export default Home;
