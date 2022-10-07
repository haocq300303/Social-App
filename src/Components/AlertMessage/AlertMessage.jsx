import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const AlertMessage = ({ content, isError = false }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={isError ? "error" : "success"}
        variant="filled"
        sx={{
          width: "300px",
          fontSize: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "& .css-ptiqhd-MuiSvgIcon-root": {
            fontSize: "20px",
          },
        }}
      >
        {content}
      </Alert>
    </Snackbar>
  );
};

AlertMessage.propTypes = {
  content: PropTypes.string,
};

export default AlertMessage;
