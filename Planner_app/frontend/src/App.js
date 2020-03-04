import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Profile from "./components/Profile";
import Products from "./components/Products";
import './App.css';
import UserApi from './api/UserApi.js';

class App extends Component {

  constructor(){
    super();
    this.state = {
        id: 0,
        name: "",
        currentWeight: "",
        desiredWeight: ""
    };
  }
  componentWillMount() {
    UserApi.user.getUser()
        .then(user => {
          this.setState({
            id: user.id,
            name: user.name,
            currentWeight: user.currentWeight,
            desiredWeight: user.desiredWeight
          });
        }) 
  }
  changeInfo = callback => {
    this.setState({
      name:callback.name,
      currentWeight:callback.currentWeight,
      desiredWeight:callback.desiredWeight
    })
  }
  render(){
    return (
      <div className="App">
        <HashRouter>
            <div id="wrapper">
              <div id="side_container">
                <div id="nav_wrapper">
                  <h4>{this.state.name}</h4>
                  <h4>{this.state.currentWeight}</h4>
                  <h4>{this.state.desiredWeight}</h4>
                  <nav>
                    <p>Home</p>
                    <NavLink to="/profile">Profile</NavLink>
                    <p>Calendar</p>
                    <NavLink to="/saved">Saved products and meals</NavLink>
                    <p>Archived menus</p>
                  </nav>
                </div>
              </div>
              <div id="main_container">
                <Route 
                  path="/profile" 
                  render={(props) => <Profile {...props} handleChange={this.changeInfo} />}
                />
                <Route 
                  path="/saved" 
                  render={(props) => <Products {...props} userId={this.state.id} />}
                />
              </div>
             </div>
          </HashRouter>
      </div>
    );
  }
}

export default App;

