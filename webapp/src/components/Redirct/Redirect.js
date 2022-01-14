import io from "socket.io-client";
import { useEffect, useState } from "react";
import lookup from "../lookup/Lookup";

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
        socket.on("id", async (id) => {
          const data = await lookup(
            "POST",
            "/auth/register",
            "",
            JSON.stringify({ id, token })
          );
          if (data.success) {
            socket.emit("success", 1);
          } else {
            socket.emit("success", 0);
          }
        });
      });
    } else {
      setSocket(io("http://localhost:5000"));
    }
  }, [setSocket, socket]);
  return <></>;
}

export default Redirct;
