import Header from "../Components/Header/Header.jsx";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./HeaderOnly.module.scss";

const cx = classNames.bind(styles);

const HeaderOnly = ({ children }) => {
   return (
      <div className={cx("wrapper")}>
         <Header />
         <main className={cx("container")}>
            <div className={cx("content")}>
               {children}
            </div>
         </main>
      </div>
   )
};

HeaderOnly.propTypes = {
   children: PropTypes.node
};

export default HeaderOnly;
