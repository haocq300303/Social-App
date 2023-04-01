import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import routes from "../../../Config/routes";
import classNames from "classnames/bind";
import styles from "./ModalLogin.module.scss";
import { Modal, Box } from "@mui/material";
import { CgClose } from "react-icons/cg";

const cx = classNames.bind(styles);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;",
};
const ModalLogin = ({ show, setShow }) => {
  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={cx("wrapper")}>
          <div className={cx("icon-close")} onClick={() => setShow(false)}>
            <CgClose />
          </div>
          <div className={cx("content")}>
            <h1 className={cx("content-heading")}>
              Hãy đămg ký tài khoản Social App để có thể thực hiện tính năng
              này.
            </h1>
            <div className={cx("content-actions")}>
              <Link to={routes.login} className={cx("actions-login")}>
                Đăng nhập
              </Link>
              <Link to={routes.register} className={cx("actions-register")}>
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

ModalLogin.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
};

export default ModalLogin;
