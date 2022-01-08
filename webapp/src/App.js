import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login, Register, RegistrationForm } from "./components";

function App(props) {
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
