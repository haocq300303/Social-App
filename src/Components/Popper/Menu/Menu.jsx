import { useState, memo } from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import PopperWrapper from "../Popper";
import HeaderMenu from "./HeaderMenu.jsx";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles);

const Menu = ({ children, items = [], show = false, setShow }) => {
  const [history, setHistory] = useState([{ data: items }]);
  const currentMenu = history[history.length - 1];

  const renderItem = () => {
    return currentMenu.data.map((item, index) => {
      const parentMenu = !!item.subMenu;
      return (
        <MenuItem
          key={index}
          to={item.to || ""}
          title={item.title}
          icon={item.icon}
          subMenu={!!item.subMenu}
          onClick={() => {
            parentMenu && setHistory((prev) => [...prev, item.subMenu]);
          }}
        />
      );
    });
  };
  return (
    <div>
      <Tippy
        interactive
        visible={show}
        placement="bottom-end"
        render={(attrs) => (
          <div className={cx("content-menu")} tabIndex="1" {...attrs}>
            <PopperWrapper>
              {history.length > 1 && (
                <HeaderMenu
                  title={currentMenu.title}
                  onBack={() => setHistory(history.slice(0, 1))}
                />
              )}
              <div className={cx("menu-body")}>{renderItem()}</div>
            </PopperWrapper>
          </div>
        )}
        onClickOutside={() => setShow(false)}
        onHide={() => setHistory(history.slice(0, 1))}
      >
        {children}
      </Tippy>
    </div>
  );
};

Menu.propTypes = {
  children: PropTypes.node,
  items: PropTypes.array,
  show: PropTypes.bool,
  setShow: PropTypes.func,
};

export default memo(Menu);
