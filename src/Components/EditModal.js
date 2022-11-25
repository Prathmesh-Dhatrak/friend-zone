import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
}));

function EditModal({ msgId, text, editMsg, handleModal, postImg }) {
  const [open, setOpen] = useState(true);
  const [newMessage, setNewMessage] = useState(text);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    handleModal();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") editMsg(msgId, newMessage);
    handleModal();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">Edit Message</DialogTitle>
        <DialogContent>
          {postImg ? (
            <img
              src={postImg}
              alt="img"
              style={{ height: "200px", width: "250px", borderRadius: "4px" }}
            />
          ) : null}
          <form autoComplete="off">
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              id="filled-basic"
              variant="filled"
              value={newMessage}
              style={{
                backgroundColor: "#2F2519",
                borderRadius: "5px",
                color: "#000",
              }}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "black" }}>
            Cancel
          </Button>
          <Button
            onClick={(e) => handleEdit(e)}
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

export default EditModal;
