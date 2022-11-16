import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import PopperWrapper from "../Popper";
import { features } from "../../../Utils/dataItem";
import classNames from "classnames/bind";
import styles from "./Message.module.scss";
import FeatureItem from "./FeatureItem";

const cx = classNames.bind(styles);

const MessageFeature = ({ children, show, setShow }) => {
  return (
    <div>
      <Tippy
        interactive
        visible={show}
        placement="bottom-end"
        onClickOutside={() => setShow(!show)}
        render={() => (
          <div className={cx("message-features")}>
            <PopperWrapper>
              {features.map((item, index) => (
                <FeatureItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  setShow={setShow}
                />
              ))}
            </PopperWrapper>
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  );
};

MessageFeature.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  setShow: PropTypes.func,
};

export default MessageFeature;
