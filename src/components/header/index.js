import { Typography } from "@mui/material/";
import { makeStyles } from "@mui/styles";

const UseStyles = makeStyles({
  textH4: {
    fontSize: "3rem",
    letterSpacing: "0.9px",
    backgroundClip: "text",
    color: "rgba(249, 211, 180, 1)",
    display: "flex",
    justifyContent: "center",
  },
});

const HeaderComponent = () => {
  const classes = UseStyles();
  return (
    <div>
      <Typography align="center" variant="h4">
        <h1 className={classes.textH4}>Spotify Clone</h1>
      </Typography>
    </div>
  );
};

export default HeaderComponent;
