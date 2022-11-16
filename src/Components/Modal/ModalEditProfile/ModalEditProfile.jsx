import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import HeaderEditProfile from "./HeaderEditProfile";
import MainSite from "./MainSite";
import SiteEditAvatar from "./SiteEditImage";
import SiteEditIntro from "./SiteEditIntro";
import SiteEditFeatured from "./SiteEditFeatured";
import classnames from "classnames/bind";
import styles from "./ModalEditProfile.module.scss";

const cx = classnames.bind(styles);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 700,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;",
  overFlowY: "scroll",
  maxHeight: "96vh",
};

const ModalEditProfile = ({ open, setOpen, setSite, currentSite }) => {
  const handleCheckSite = (component) => {
    let page = "";
    switch (component) {
      case "SiteEditProfilePicture":
        page = <SiteEditAvatar setSite={setSite} />;
        break;
      case "SiteEditCoverPhoto":
        page = <SiteEditAvatar setSite={setSite} isEditAvatar={false} />;
        break;
      case "SiteEditIntro":
        page = <SiteEditIntro setSite={setSite} />;
        break;
      case "SiteEditFeatured":
        page = <SiteEditFeatured setSite={setSite} />;
        break;
      default:
        page = <MainSite setSite={setSite} setOpen={setOpen} />;
        break;
    }
    return page;
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setSite((prev) => prev.slice(0, 1));
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={cx("wrapper")}>
        <div className={cx("header")}>
          <HeaderEditProfile
            isChildren={currentSite.title !== "Profile" ? true : false}
            setOpen={setOpen}
            title={currentSite.title}
            setSite={setSite}
          />
        </div>
        <div className={cx("modal-body")}>
          {handleCheckSite(currentSite.component)}
        </div>
      </Box>
    </Modal>
  );
};

ModalEditProfile.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setSite: PropTypes.func,
  currentSite: PropTypes.object,
};

export default ModalEditProfile;
