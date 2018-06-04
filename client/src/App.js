import React, { Component } from 'react';

/*
Libraries
*/
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

/*
Material UI
*/
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './App.css';

/*
Layouts
*/
import Main from './layouts/main/Main';

/*
Configuration
*/
import config from './config.json';

/*
State management via Redux
*/
import store from './store';

/*
Auth state
*/
import { AUTHENTICATED, UNAUTHENTICATED } from './constants';
const auth = localStorage.getItem('flowntasy_auth');
// console.log(JSON.parse(localStorage.getItem('flowntasy_auth')));
// console.log(JSON.parse(auth)['token']);

// also gives the roles
if(auth) {
  // if flowntasy_auth has a token -> means their account is not disabled -> let them authenticate.
  if (JSON.parse(auth)['token']) {
    store.dispatch({ type: AUTHENTICATED, role: JSON.parse(auth)['user']['_role'], payload: JSON.parse(auth) });
  }
} else {
  store.dispatch({ type: UNAUTHENTICATED });
}

/*
Theme
*/
const theme = createMuiTheme();

class App extends Component {
  render() {    
    return (
      <Provider store={store}>
        <Router>
      
            <Main />
 
        </Router>
      </Provider>
    );
  }
}

export default App;
