import './App.css';
import {Login,Navbar} from './components';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
