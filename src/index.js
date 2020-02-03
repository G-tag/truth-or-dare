import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import AuthProvider from './context/AuthContext';
import OptionsProvider from './context/OptionsContext';
import ThemeProvider from './context/ThemeContext';
import * as serviceWorker from './serviceWorker';

const app = (
  <BrowserRouter>
    <AuthProvider>
      <OptionsProvider>
        <ThemeProvider>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </OptionsProvider>
    </AuthProvider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
