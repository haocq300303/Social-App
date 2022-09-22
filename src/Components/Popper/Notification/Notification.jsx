import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import PopperWrapper from "../Popper";
import classNames from "classnames/bind";
import styles from "./Notification.module.scss";
import NotificationItem from "./NotificationItem";

const cx = classNames.bind(styles);

const Notification = ({ children, data = [], show, setShow, setActiveNoti }) => {
   return (
      <div>
         <Tippy
            interactive
            visible={show}
            placement="bottom-end"
            offset={[50, 10]}
            onClickOutside={() => {
               setShow(!show);
               setActiveNoti(prev => !prev);
            }}
            render={() => (
               <div className={cx("notifications")}>
                  <PopperWrapper>
                     <h4 className={cx("noti-header")}>Notifications</h4>
                     <div className={cx("noti-body")}>
                        <NotificationItem avatar={""} content="Hào Chu Quangg was liked your post" />
                        <NotificationItem avatar={""} content="Hào Chu Quangg was commented your post" />
                        <NotificationItem avatar={""} content="Hào Chu Quangg was shared your post" />
                        <NotificationItem avatar={""} content="Hào Chu Quangg was liked your post" />
                        <NotificationItem avatar={""} content="Hào Chu Quangg was liked your post" />
                        <NotificationItem avatar={""} content="Hào Chu Quangg was liked your post" />
                        <NotificationItem avatar={""} content="Hào Chu Quangg was liked your post" />
                     </div>


                     {/* {data.map((item) => (
                        <NotificationItem avatar={""} content="Hào Chu Quangg was liked your post" />
                     ))} */}
                  </PopperWrapper>
               </div>
            )}
         >
            {children}
         </Tippy>
      </div>
   )
};

Notification.propTypes = {
   children: PropTypes.node,
   data: PropTypes.array,
   show: PropTypes.bool,
   setShow: PropTypes.func,
   setActiveNoti: PropTypes.func,
};

export default Notification;
