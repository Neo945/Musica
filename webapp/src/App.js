import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login, Register, RegistrationForm } from "./components";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useEffect } from "react";
const client = new W3CWebSocket("ws://localhost:5000");

function App(props) {
  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log(message);
    };
  }, []);
  const history = useNavigate();
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login history={history} />} />
        <Route path="/register" element={<Register history={history} />} />
        <Route
          path="/register/form"
          element={<RegistrationForm history={history} />}
        />
      </Routes>
    </div>
  );
}

export default App;
