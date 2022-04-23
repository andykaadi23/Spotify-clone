import "../../components/button/style.css";
import { Button } from "@mui/material";
import { Container } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import "../../components/header/style.css"

const UseStyles = makeStyles({
  btnLogin: {
    "&:hover": {
      backgroundColor: "green",
    },
  },
  containerLogin: {
    height: '100%',
    overflow: 'hidden',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
});

const LoginPage = (props) => {
  const classes = UseStyles();

  return (
    <Container className={classes.containerLogin} align="center" >
      <Button
        className={classes.btnLogin}
        variant="contained"
        size="large"
        color="primary"
        href={props.auth_link}        
      >
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
