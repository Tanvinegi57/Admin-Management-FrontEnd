import React, { useEffect, useState } from "react";
import { use } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import SideBar from "../Sidebar/SideBar";
let socket;

const ENDPOINT = "https://demo-cchat.herokuapp.com/";

const Chat = () => {
  let users = JSON.parse(localStorage.getItem("jwt"));
  let user = users.data.user.name;
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  console.log(messages);
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("Connected");
      setid(socket.id);
    });
    console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <>
      <SideBar />
      <div className="chatPage">
        <div className="chatContainer">
          <div className="header">
            <h2>Group CHAT</h2>
          </div>
          <ReactScrollToBottom className="chatBox">
            {messages.map((item, i) => (
              <Message
                user={item.id === id ? "" : item.user}
                message={item.message}
                classs={item.id === id ? "right" : "left"}
              />
            ))}
          </ReactScrollToBottom>
          <div className="inputBox">
            <input
              onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
              type="text"
              id="chatInput"
            />
            <button onClick={send} className="sendBtn">
              <img src={sendLogo} alt="Send" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
