import React from "react";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import loginImg from "../Assets/login-2.png";
import Topography from "@material-ui/core/Typography";
import { auth, provider } from "../Firebase/Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 0 15px rgb(7 15 63 / 33%)",
    backgroundColor: "#ffe8d6",
    color: "#001219",
    textAlign: "center",
  },
  paper: {
    // marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "25px",
    paddingTop: "35px",
  },
  mainImg: {
    width: "50%",
    height: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#001219",
  },
  colorize: {
    fontSize: "1rem",
    color: "#fff",
  },
}));

function SignUp() {
  const classes = useStyles();

  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loginDefault = () => {
    auth
      .signInWithEmailAndPassword("defaultuser@gmail.com", "123456")
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        console.log("Success");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <Container component="div" maxWidth="xs" className={classes.root}>
      <div className={classes.paper}>
        <img src={loginImg} className={classes.mainImg} alt="signup img" />
        <Topography variant="h4" style={{ paddingTop: "15px" }}>
          Sign In To Friend Zone
        </Topography>
        <Button
          variant="outlined"
          color="primary"
          className={classes.submit}
          startIcon={<FcGoogle />}
          onClick={login}
        >
          Sign In With Google
        </Button>
        or
        <Button
          variant="outlined"
          color="primary"
          className={classes.submit}
          startIcon={<FcGoogle />}
          onClick={loginDefault}
        >
          Default Login
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
          borderTopRightRadius: "2rem",
          borderTopLeftRadius: "2rem",
        }}
      >
        <span className={classes.colorize}>Designed</span> with ❤️ <br />
        by Prathmesh Dhatrak
      </div>
    </Container>
  );
}

export default SignUp;

