import './App.css';
// eslint-disable-next-line
import {Login,Navbar,Signup,LanguageSelect} from './components';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import FormTest from './temp/form';
import { makeStyles } from '@material-ui/core';

function App() {
  const classes = makeStyles(theme => ({
    '@global': {
      '#root': {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
    },
  }))();
  return (
    <div>
    <Router>
      <Navbar/>
      {/* <div style={{height:"550px"}}> */}
      {/* </div> */}
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/test">
          <FormTest/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/language">
          <LanguageSelect/>
        </Route>
      </Switch>
    </Router>
    </div>
  )
}

export default App;
