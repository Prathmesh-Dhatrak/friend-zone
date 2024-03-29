import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db } from "../Firebase/Firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
}));

function EditProfile({ toggler, alert }) {
  const [open, setOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    toggler();
  };

  const updateProfile = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(uid)
      .update({
        displayName: displayName,
      })
      .then((res) => {
        alert();
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
    toggler();
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userDetails"));
    setUserName(userData.name);
    setDisplayName(userData.displayName);
    setEmail(userData.email);
    setUid(userData.uid);
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">Edit User Profile</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              id="filled-basic"
              variant="filled"
              disabled
              value={userName}
              style={{
                backgroundColor: "#2F2519",
                borderRadius: "5px",
                color: "#000",
              }}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              id="filled-basic"
              variant="filled"
              disabled
              value={email}
              style={{
                backgroundColor: "#2F2519",
                borderRadius: "5px",
                color: "#000",
              }}
            />

            <TextField
              label="Display Name"
              fullWidth
              margin="normal"
              id="filled-basic"
              variant="filled"
              value={displayName}
              style={{
                backgroundColor: "#2F2519",
                borderRadius: "5px",
              }}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ color: "black" }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => updateProfile(e)}
            color="success"
            variant="contained"
            style={{
              color: "white",
              backgroundColor: "green",
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfile;

