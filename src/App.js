import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainDisplayContainer from './components/MainDisplayContainer'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar />
          <MainDisplayContainer />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
