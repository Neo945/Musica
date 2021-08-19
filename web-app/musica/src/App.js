import './App.css';
// eslint-disable-next-line
import {Login,Navbar,Signup,LanguageSelect} from './components';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import FormTest from './components/temp/form';
import { makeStyles } from '@material-ui/core';
import {Box} from '@material-ui/core'
import PlayerPage from './components/player';

function App() {
  makeStyles(theme => ({
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
      <Switch>
        <Route path="/login">
          <Navbar/>
          <Box height="64px"/>
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
        <Route path="/player">
          <PlayerPage />
        </Route>
      </Switch>
    </Router>
    </div>
  )
}

export default App;
