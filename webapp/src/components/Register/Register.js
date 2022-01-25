import OAuth from "../OAuth/OAuth";
import io from "socket.io-client";
import isEmail from "validator/lib/isEmail";
import { useEffect, useState } from "react";
import lookup from "../lookup/Lookup";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";

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
        {loading ? <CircularProgress style={{ position: "absolute" }} /> : null}
        <FormControl
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
                  socket.on("success", (success) => {
                    if (success) {
                      props.history("/register/success");
                    } else alert("Something went wrong");
                  });
                } else alert("Something went wrong");
              } else {
                alert(JSON.stringify(data.message, 2, 4));
              }
            }
          }}
        >
          <TextField
            autoComplete="username"
            label="Username"
            variant="outlined"
            name="username"
            type="text"
            value={state.username}
            onChange={(e) => {
              setState({ ...state, email: e.target.value });
            }}
          />
          <TextField
            autoComplete="email"
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={state.email}
            onChange={(e) => {
              setState({ ...state, email: e.target.value });
            }}
          />
          <Button type="submit" variant="contained" name="sumbit">
            Submit
          </Button>
        </FormControl>
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
