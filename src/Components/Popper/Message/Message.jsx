import { useState, useEffect, memo } from "react";
import useDebounce from "../../../Hooks/useDebounce";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import { IoMdSearch } from "react-icons/io";
import { HiArrowLeft } from "react-icons/hi";
import PopperWrapper from "../Popper";
import MessageSearch from "./MessageSearch";
import MessageListFriend from "./MessageListFriend";
import classNames from "classnames/bind";
import styles from "./Message.module.scss";
import { searchUser } from "../../../Services/userService";

const cx = classNames.bind(styles);

const Message = ({ children, data = [], show, setShow, setActiveMessage }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  const debounce = useDebounce(valueSearch, 800);

  useEffect(() => {
    if (!debounce.trim()) {
      setResultSearch([]);
      return;
    }
    const fetchApi = async () => {
      try {
        const data = await searchUser(debounce);
        setResultSearch(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [debounce]);

  return (
    <div>
      <Tippy
        interactive
        visible={show}
        placement="bottom-end"
        offset={[100, 10]}
        onClickOutside={() => {
          setShow(!show);
          setActiveMessage((prev) => !prev);
          setShowSearch(false);
        }}
        render={() => (
          <div className={cx("message")}>
            <PopperWrapper>
              <h4 className={cx("message-header")}>Chats</h4>
              <div className={cx("message-search")}>
                {showSearch ? (
                  <button
                    className={cx("btn-back")}
                    onClick={() => setShowSearch(false)}
                  >
                    <HiArrowLeft />
                  </button>
                ) : undefined}
                <div
                  className={
                    showSearch
                      ? cx("search-input", "active")
                      : cx("search-input")
                  }
                >
                  {!showSearch && (
                    <button className={cx("icon-search")}>
                      <IoMdSearch />
                    </button>
                  )}
                  <input
                    value={valueSearch}
                    type="text"
                    className={showSearch ? cx("input", "active") : cx("input")}
                    placeholder="Search message"
                    onFocus={() => setShowSearch(true)}
                    onChange={(e) => setValueSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className={cx("message-body")}>
                {showSearch ? (
                  <MessageSearch data={resultSearch} />
                ) : (
                  <MessageListFriend
                    setShow={setShow}
                    setActiveMessage={setActiveMessage}
                  />
                )}
              </div>
            </PopperWrapper>
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
};

Message.propTypes = {
  children: PropTypes.node,
  data: PropTypes.array,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setActiveMessage: PropTypes.func,
};

export default memo(Message);
