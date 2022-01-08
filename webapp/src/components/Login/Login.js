import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import OAuth from "../OAuth/OAuth";

function Login(props) {
  const [loginState, setLoginState] = useState({ email: "", pass: "" });
  const [passVis, setPassVis] = useState(false);
  return (
    <>
      <div className="login">
        <OAuth />
        <form
          method="POST"
          action="/"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isEmail(loginState.email)) {
              alert("Not a valid email");
            } else if (!isStrongPassword(loginState.pass)) {
              alert("Not a Strong password");
            } else {
              console.log(loginState);
              props.history("/q");
            }
          }}
        >
          <input
            autoComplete="email"
            name="email"
            type="email"
            value={loginState.email}
            onChange={(e) => {
              setLoginState({ ...loginState, email: e.target.value });
            }}
          />
          <input
            autoComplete="current-password"
            type={passVis ? "text" : "password"}
            name="password"
            value={loginState.pass}
            onChange={(e) => {
              setLoginState({ ...loginState, pass: e.target.value });
            }}
          />
          <input
            type="checkbox"
            value={passVis}
            onChange={(e) => {
              setPassVis(e.target.checked);
            }}
          />
          <input type="submit" name="sumbit" />
        </form>
      </div>
    </>
  );
}
export default Login;
