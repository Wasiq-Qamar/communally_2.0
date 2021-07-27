import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';
import axios from 'axios';

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions'

//Material UI
import {MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from './util/theme';
// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

//Pages
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';
import user from './pages/user';

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL = 'https://asia-east2-communaly.cloudfunctions.net/api';


const token = localStorage.FBidToken;
if (token){
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp*1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
  else{
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component{
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <Router>
              <Navbar/>
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home} />
                  <AuthRoute exact path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signup} />
                  <Route exact path="/users/:handle" component={user} />
                  <Route exact path="/users/:handle/scream/:screamId" component={user} />
                </Switch>
              </div>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
