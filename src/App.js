import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Epicerie from './containers/Epicerie/Epicerie';
import './App.css';

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
