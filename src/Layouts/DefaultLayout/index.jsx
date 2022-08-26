import Header from "../Components/Header/Header";
import Slidebar from "./Slidebar/Slidebar";

import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

const defaultLayout = ({ children }) => {
   return (
      <div className={cx("wrapper")}>
         <Header />
         <main className={cx("container")}>
            <aside className={cx("slidebar")}><Slidebar /></aside>
            <article className={cx("content")}>
               {children}
            </article>
         </main>
      </div>
   )
};

defaultLayout.propTypes = {
   children: PropTypes.node
};

export default defaultLayout;
