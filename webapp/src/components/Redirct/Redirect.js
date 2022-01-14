import io from "socket.io-client";
import { useEffect, useState } from "react";

function Redirct(props) {
  const [socket, setSocket] = useState(null);
  //   const [id, setID] = useState("");
  useEffect(() => {
    if (socket) {
      const token = new URLSearchParams(window.location.href).get("token");
      socket.on("connect", () => {
        socket.emit("joinVerify", {
          room: token.slice(token.length - 4),
        });
        socket.emit("send", "id");
        socket.on("id", (id) => {
          // fetch to verify
        });
      });
    } else {
      setSocket(io("http://localhost:5000"));
    }
  }, [setSocket, socket]);
  return <></>;
}

export default Redirct;
