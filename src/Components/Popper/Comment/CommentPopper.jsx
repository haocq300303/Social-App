import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import { useState, memo } from "react";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import styles from "./CommentPopper.module.scss";
import {
  deleteComment,
  deleteReply,
  getAllComment,
} from "../../../Services/commentService";
import ModalDelete from "../../Modal/ModalDelete/ModalDelete";

const cx = classNames.bind(styles);
const CommentPopper = ({
  children,
  show,
  setShow,
  setComments,
  fetchUserReply,
  idCurrentUser,
  userId,
  idAdminPost,
  userIdComment,
  userIdReply,
  idComment,
  idReply,
  isDeleteReply = false,
  setShowReply,
  idPost,
}) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleDelete = async () => {
    try {
      if (isDeleteReply) {
        await deleteReply(
          idComment,
          idCurrentUser,
          idAdminPost,
          userId,
          idReply
        );
        const result = await getAllComment(idPost);
        setComments(result);
        fetchUserReply();
        setShowModalDelete(false);
        setShowReply(true);
        return;
      }
      await deleteComment(idComment, idCurrentUser, idAdminPost, userId);
      const res = await getAllComment(idPost);
      setComments(res);
      setShowModalDelete(false);
    } catch (error) {
      toast.error("delete failed!!!");
    }
  };
  return (
    <div>
      <Tippy
        interactive
        visible={show}
        placement="bottom-end"
        arrow={true}
        render={(attrs) => (
          <div className={cx("feature-comment")} tabIndex="1" {...attrs}>
            <div
              className={cx("feature-comment-item")}
              onClick={() => {
                toast.success("Send report successfully!!!");
                setShow(false);
              }}
            >
              Report comment
            </div>
            {(idCurrentUser === idAdminPost ||
              idCurrentUser === userIdComment ||
              idCurrentUser === userIdReply) && (
              <div
                className={cx("feature-comment-item")}
                onClick={() => {
                  setShowModalDelete(true);
                  setShow(false);
                }}
              >
                Delete comment
              </div>
            )}
          </div>
        )}
        onClickOutside={() => setShow(false)}
      >
        {children}
      </Tippy>
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        content={isDeleteReply ? "reply" : "comment"}
        handleDelete={handleDelete}
      />
    </div>
  );
};

CommentPopper.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setShowReply: PropTypes.func,
  setComments: PropTypes.func,
  fetchUserReply: PropTypes.func,
  idReply: PropTypes.string,
  userIdComment: PropTypes.string,
  idCurrentUser: PropTypes.string,
  idAdminPost: PropTypes.string,
  userId: PropTypes.string,
  userIdReply: PropTypes.string,
  idComment: PropTypes.string,
  isDeleteReply: PropTypes.bool,
  idPost: PropTypes.string,
};

export default memo(CommentPopper);
