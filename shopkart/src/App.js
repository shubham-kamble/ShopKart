import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Navbar/>
        <Route path="/profile" exact strict Component={Login}/>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;