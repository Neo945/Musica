import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Login, Register, RegistrationForm } from './components';

function App(props) {
	const history = useNavigate();
	console.log("Yo");
  return (
    <div className="App">
        <Routes>
          <Route path="/login" element={<Login history={history}/>} />
          <Route path="/register" element={<Register history={history}/>} />
          <Route path="/register/form" element={<RegistrationForm history={history}/>} />
          <Route path="/q" element={<>Hekko</>} />
        </Routes>
    </div>
  );
}

export default App;
