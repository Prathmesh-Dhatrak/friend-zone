import React, { useState, useEffect } from "react";
import "./App.css";
import Message from "./Message.js";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("Messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your Name"));
  }, []);
  const sendMesseage = (event) => {
    event.preventDefault();
    db.collection("Messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="App">
      <img
        src="https://cdn.iconscout.com/icon/free/png-512/facebook-messenger-2-569346.png"
        width="100px"
        height="100px"
      />
      <h1>Messeanger</h1>
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input
            className="app_input"
            placeholder="Enter a message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app_iconButton"
            onClick={sendMesseage}
            type="submit"
            variant="contained"
            color="primary"
            disabled={!input}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
