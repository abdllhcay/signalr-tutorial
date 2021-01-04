import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

function App() {
  const [connectionId, setConnectionId] = useState("");
  const [notification, setNotification] = useState({});
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/hubs/notification")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          connection.invoke("GetConnectionId")
            .then(function (connectionId) {
              console.log("Connected: " + connectionId)
              setConnectionId(connectionId);
            });
        })
        .then((result) => {
          connection.on("receivenotification", (notification) => {
            setNotification(notification);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const sendNotification = async () => {
    const notification = {
      connectionId,
      message: "Hello notification"
    };

    if (connection.connectionStarted) {
      try {
        await connection.send("SendNotification", notification);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  }

  return (
    <div>
      <h3>{notification.message}</h3>
      <button onClick={sendNotification}>Send Manually</button>
    </div>
  );
}

export default App;