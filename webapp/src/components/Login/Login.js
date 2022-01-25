import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import OAuth from "../OAuth/OAuth";
import lookup from "../lookup/Lookup";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login(props) {
  const [loginState, setLoginState] = useState({ email: "", pass: "" });
  const [passVis, setPassVis] = useState(false);
  return (
    <>
      <div className="login">
        <OAuth />
        <FormControl
          method="POST"
          action="/"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!isEmail(loginState.email)) {
              alert("Not a valid email");
            } else if (!isStrongPassword(loginState.pass)) {
              alert("Not a Strong password");
            } else {
              console.log(loginState);
              const data = await lookup(
                "POST",
                "/auth/login",
                "",
                JSON.stringify(loginState)
              );
              console.log(data);
              props.history("/q");
            }
          }}
        >
          <TextField
            autoComplete="email"
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={loginState.email}
            onChange={(e) => {
              setLoginState({ ...loginState, email: e.target.value });
            }}
          />
          <OutlinedInput
            autoComplete="current-password"
            type={passVis ? "text" : "password"}
            name="password"
            label="Password"
            variant="outlined"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPassVis(!passVis)}
                  edge="end"
                >
                  {!passVis ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={loginState.pass}
            onChange={(e) => {
              setLoginState({ ...loginState, pass: e.target.value });
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
export default Login;
