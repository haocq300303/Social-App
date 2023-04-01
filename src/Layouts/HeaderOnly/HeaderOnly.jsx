import Header from "../Components/Header/Header.jsx";
import classNames from "classnames/bind";
import styles from "./HeaderOnly.module.scss";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { MdOutlineExplore, MdOutlineSettings } from "react-icons/md";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const HeaderOnly = () => {
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
          <ul className={cx("list-menu")}>
            <li className={cx("list-menu_item")}>
              <NavLink
                to={"/"}
                className={(navData) =>
                  navData.isActive
                    ? cx("menu_item-link", "active")
                    : cx("menu_item-link")
                }
              >
                <span className={cx("menu_item-icon")}>
                  <MdOutlineExplore />
                </span>
                <p className={cx("title")}>Explore</p>
              </NavLink>
            </li>
            <li className={cx("list-menu_item")}>
              <NavLink
                to={"/setting"}
                className={(navData) =>
                  navData.isActive
                    ? cx("menu_item-link", "active")
                    : cx("menu_item-link")
                }
              >
                <span className={cx("menu_item-icon")}>
                  <MdOutlineSettings />
                </span>
                <p className={cx("title")}>Setting</p>
              </NavLink>
            </li>
          </ul>
        </aside>
        <article className={active ? cx("content", "active") : cx("content")}>
          <Outlet />
        </article>
      </main>
    </div>
  );
};

export default HeaderOnly;
