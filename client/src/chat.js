import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

import ChatWindow from "./chat-window";
import ChatInput from "./chat-input";

const Chat = () => {
  const [connectionId, setConnectionId] = useState("");
  const [notification, setNotification] = useState("");
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  latestChat.current = chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/hubs/chat")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          // connection.on("ReceiveMessage", (message) => {
          //   const updatedChat = [...latestChat.current];
          //   updatedChat.push(message);

          //   console.log(JSON.stringify(message));

          //   setChat(updatedChat);
          // });

          connection.on("receivenotification", (message) => {
            setNotification(message);
          });
        })
        .then((result) => {
          connection.invoke("GetConnectionId")
            .then(function (connectionId) {
              console.log(connectionId);
              setConnectionId(connectionId);
              // connection.send("SendConnectionId", data);
            });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const sendMessage = async (user, message) => {
    const chatMessage = {
      user: user,
      message: message,
    };

    if (connection.connectionStarted) {
      try {
        await connection.send("SendMessage", chatMessage);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  const sendNotification = async () => {
    const notification = {
      message: "Hello notification"
    };

    if (connection.connectionStarted) {
      try {
        await connection.send("SendNotification", notification.message, connectionId);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  }

  return (
    <div>
      {/* <ChatInput sendMessage={sendMessage} />
      <hr />
      <ChatWindow chat={chat} /> */}
      <h3>{notification}</h3>
      <button onClick={sendNotification}>Send</button>
    </div>
  );
};

export default Chat;
