import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Badge, Avatar } from "@mui/material";
import noAvatar from "../../Assets/images/noAvatar.png";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: "-0.8px",
      left: "-0.8px",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(0.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const AvatarUser = ({
  src,
  isActive = false,
  sizeSmall = false,
  sizeLage = false,
}) => {
  return (
    <>
      {isActive ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            alt="avatar"
            sx={
              sizeLage
                ? { width: 56, height: 56 }
                : sizeSmall
                ? { width: 30, height: 30 }
                : { width: 40, height: 40 }
            }
            src={src ? src : noAvatar}
          />
        </StyledBadge>
      ) : (
        <Avatar
          alt="avatar"
          sx={
            sizeLage
              ? { width: 56, height: 56 }
              : sizeSmall
              ? { width: 30, height: 30 }
              : { width: 40, height: 40 }
          }
          src={src ? src : noAvatar}
        />
      )}
    </>
  );
};

AvatarUser.propTypes = {
  src: PropTypes.string,
  isActive: PropTypes.bool,
  sizeSmall: PropTypes.bool,
};

export default AvatarUser;
