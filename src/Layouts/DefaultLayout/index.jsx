import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header/Header";
import Slidebar from "./Slidebar/Slidebar";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const [active, setActive] = useState(false);
  const location = useLocation();
  const url = location.pathname.slice(0, 8);

  useEffect(() => {
    if (url === "/profile") {
      return setActive(true);
    }
    setActive(false);
  }, [url]);

  return (
    <div className={cx("wrapper")}>
      <Header />
      <main className={cx("container")}>
        <aside className={active ? cx("slidebar", "active") : cx("slidebar")}>
          <Slidebar active={active} />
        </aside>
        <article className={active ? cx("content", "active") : cx("content")}>
          {children}
        </article>
      </main>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;
