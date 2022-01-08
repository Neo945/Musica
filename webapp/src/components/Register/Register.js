import OAuth from "../OAuth/OAuth";
import isEmail from "validator/lib/isEmail";
import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import lookup from "../lookup/Lookup";

const client = new W3CWebSocket("ws://localhost:5000");

function UserEmail(props) {
  const [state, setState] = useState({ email: "", username: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      if (message.success) {
        setLoading(false);
        props.history("/register/form", { state });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                if (data.success) setLoading(true);
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
