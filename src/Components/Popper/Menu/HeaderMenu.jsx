import { IoIosArrowBack } from "react-icons/io";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const HeaderMenu = ({ title, onBack }) => {
   return (
      <header className={cx("header-menu")}>
         <button
            className={cx("btn-back")}
            onClick={onBack}
         >
            <IoIosArrowBack />
         </button>
         <p className={cx("header-text")}>{title}</p>
      </header>
   )
};

HeaderMenu.propTypes = {
   title: PropTypes.string.isRequired,
   onBack: PropTypes.func
};

export default HeaderMenu;
