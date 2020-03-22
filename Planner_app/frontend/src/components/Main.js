import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Profile from "./Profile";
import Products from "./Products";
import '../App.css';
import UserApi from '../api/UserApi.js';


class Main extends Component {

  constructor(){
    super();
    this.state = {
        username: "",
        currentWeight: "",
        desiredWeight: ""
    };
  }

  componentWillMount() {
    UserApi.user.getUser()
        .then(user => {
          this.setState({
            username: user.username,
            currentWeight: user.currentWeight,
            desiredWeight: user.desiredWeight
          });
        }) 
  }
  changeInfo = callback => {
    this.setState({
      username:callback.username,
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
                  <h4>{this.state.username}</h4>
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
                <Route path="/saved" component={Products}/>
              </div>
             </div>
          </HashRouter>
      </div>
    );
  }
}

export default Main;

