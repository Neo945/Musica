import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
const theme = createTheme({
  palette: {
    type: 'dark',
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
