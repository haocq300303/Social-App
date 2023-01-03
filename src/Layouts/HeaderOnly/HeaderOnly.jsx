import Header from "../Components/Header/Header.jsx";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./HeaderOnly.module.scss";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineExplore, MdOutlineSettings } from "react-icons/md";

const cx = classNames.bind(styles);

const HeaderOnly = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <main className={cx("container")}>
        <aside className={cx("slidebar")}>
          <ul className={cx("list-menu")}>
            <li className={cx("list-menu_item")}>
              <NavLink
                to={"/"}
                className={(navData) =>
                  navData.isActive``
                    ? cx("menu_item-link", "active")
                    : cx("menu_item-link")
                }
              >
                <span className={cx("menu_item-icon")}>
                  <MdOutlineExplore />
                </span>
                <p>Explore</p>
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
                <p>Setting</p>
              </NavLink>
            </li>
          </ul>
        </aside>
        <article className={cx("content")}>
          <Outlet />
        </article>
      </main>
    </div>
  );
};

HeaderOnly.propTypes = {
  children: PropTypes.node,
};

export default HeaderOnly;
