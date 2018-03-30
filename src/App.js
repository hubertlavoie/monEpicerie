import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Epicerie from './containers/Epicerie/Epicerie';
import './App.css';
import * as firebase from "firebase";
var config = {
  databaseURL: "https://react-my-burger-7dea4.firebaseio.com/"
};
firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider>
        <Epicerie></Epicerie>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
