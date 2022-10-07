import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import classnames from "classnames/bind";
import ListStory from "./ListStory";
import MainStory from "./MainStory";
import styles from "./Stories.module.scss";

const cx = classnames.bind(styles);
const Stories = () => {
  return (
    <div className={cx("wrapper")}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ListStory />
          </Grid>
          <Grid item xs={8}>
            <div className={cx("content")}>
              <MainStory />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Stories;
