import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Application from "./Components/Application";
import Chat from "./Components/Chat";
import Login from "./Components/SignUp";
import Home from "./Components/Home";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth, db } from "./Firebase/Firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#ffe8d6 !important",
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("user exits");
            } else {
              const details = {
                name: user.displayName,
                displayName: user.displayName.split(" ")[0],
                photoURL: user.photoURL,
                email: user.email,
                uid: user.uid,
              };
              db.collection("users")
                .doc(user.uid)
                .set(details)
                .then((res) => {
                  console.log("new user created");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });

        setUser(user.uid);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Box display="flex" maxWidth={false} alignItems="center">
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Router>
          {!user ? (
            <Login />
          ) : (
            <div className={classes.root}>
              <Application uid={user} />
              <main className={classes.content}>
                <div
                  className={classes.toolbar}
                  style={{ minHeight: "50px" }}
                />
                <Switch>
                  <Route path="/" exact>
                    <Home />
                  </Route>
                  <Route path="/channel/:id">
                    <Chat />
                  </Route>
                </Switch>
              </main>
            </div>
          )}
        </Router>
      )}
    </div>
  );
}

export default App;
