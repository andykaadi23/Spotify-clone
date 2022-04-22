import { Typography, Avatar, Container, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { makeStyles } from "@mui/styles";

const UseStyles = makeStyles({
  profilePic: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    height: 150,
    width: 150,
  },
  btnLogout: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    "&:hover": {
      backgroundColor: "green",
    },
  },
});

const UserComponent = (props) => {
  const classes = UseStyles();

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("token", " ");
    window.location.href = "/";
  };
  return (
    <Container disableGutters>
      <Avatar
        className={classes.profilePic}
        alt="Profile Pic"
        src={props.profilePic}
      />
      <Typography 
      
      variant="h4"
      sx={{fontSize: '1rem',
      textAlign: "center",
      marginTop: 2,
      marginBottom: 2,
      color: "rgba(249, 211, 180, 1)"  
      }}
      >
        Welcome {props.userName}!
      </Typography>
      <Button
        // className={classes.btnLogout}
        onClick={handleLogout}
        color="primary"
        variant="contained"
        size="small"
        endIcon={<ExitToAppIcon />}
        sx={{
        display: 'flex',
        marginLeft: "auto",
        marginRight: "auto", 
        }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default UserComponent;
