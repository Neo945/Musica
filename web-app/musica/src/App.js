import './App.css';
import {Login,Navbar,Signup,LanguageSelect} from './components';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/language">
          <LanguageSelect/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
