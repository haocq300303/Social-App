import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Slidebar from "./Slidebar/Slidebar";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

const DefaultLayout = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    if (url === "/") {
      return setActive(false);
    }
    setActive(true);
  }, [url]);

  return (
    <div className={cx("wrapper")}>
      <Header />
      <main className={cx("container")}>
        <aside className={active ? cx("slidebar", "active") : cx("slidebar")}>
          <Slidebar active={active} />
        </aside>
        <article className={active ? cx("content", "active") : cx("content")}>
          <Outlet />
        </article>
      </main>
    </div>
  );
};

export default DefaultLayout;
