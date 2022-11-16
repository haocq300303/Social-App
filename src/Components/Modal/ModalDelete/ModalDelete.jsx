import PropTypes from "prop-types";
import { Modal, Box, Button } from "@mui/material";
import classnames from "classnames/bind";
import styles from "./ModalDelete.module.scss";

const cx = classnames.bind(styles);
// style modal confirm delete
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;",
};

const ModalDelete = ({ show, setShow, content, handleDelete }) => {
  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={cx("modal-header")}>
          <h3 className={cx("header-heading")}>Confirm Delete</h3>
        </div>
        <div className={cx("modal-body")}>
          <h3 className={cx("modal-content")}>
            Are you sure you want to delete this {content}?
          </h3>
          <div className={cx("btn-confirm")}>
            <Button
              variant="contained"
              color="error"
              className={cx("btn-delete")}
              size="large"
              onClick={() => {
                handleDelete();
              }}
            >
              Xác nhận
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setShow(false)}
            >
              Hủy
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

ModalDelete.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  handleDelete: PropTypes.func,
  content: PropTypes.string,
};

export default ModalDelete;
