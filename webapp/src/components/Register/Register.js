import OAuth from "../OAuth/OAuth";
import io from "socket.io-client";
import isEmail from "validator/lib/isEmail";
import { useEffect, useState } from "react";
import lookup from "../lookup/Lookup";

function UserEmail(props) {
  const [socket, setSocket] = useState(null);
  const [state, setState] = useState({ email: "", username: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    // if (socket) {
    //   socket.on("connect", () => {
    //     console.log("connected");
    //   });
    // }
  }, [setSocket]);
  return (
    <>
      <div className="email-form">
        {!loading ? <div style={{ position: "absolute" }}>Loading</div> : null}
        <form
          method="POST"
          action="/"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!isEmail(state.email)) {
              alert("Not a valid email");
            } else if (!state.username) {
              alert("Not a valid username");
            } else {
              const data = await lookup(
                "POST",
                "/auth/register",
                "",
                JSON.stringify(state)
              );
              console.log(data);
              if (data.success) {
                props.history("/register/form");
                const data = await lookup(
                  "POST",
                  "/email/send",
                  "",
                  JSON.stringify({ email: state.email })
                );
                if (data.success) {
                  setLoading(true);
                  socket.emit("joinVerify", {
                    room: data.room,
                  });
                  socket.on("send", (data) => {
                    if (data === "id") socket.emit("id", data.user._id);
                  });
                }
              } else {
                alert(JSON.stringify(data.message, 2, 4));
              }
            }
          }}
        >
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={(e) => setState({ ...state, username: e.target.value })}
          />
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

function Register(props) {
  return (
    <>
      <div className="register">
        <OAuth />
        <UserEmail />
      </div>
    </>
  );
}

export default Register;
