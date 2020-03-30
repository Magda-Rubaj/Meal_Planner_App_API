import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter,
} from "react-router-dom";
import Profile from "./Profile";
import Products from "./Products";
import '../App.css';
import UserApi from '../api/UserApi.js';
import CalendarComp from './CalendarComp';
import CalendarDay from './CalendarDay';
import TokenApi from '../api/TokenApi.js';


class Main extends Component {

  constructor(){
    super();
    this.state = {
        username: "",
        currentWeight: "",
        desiredWeight: "",
        day: 0,
        month: 0
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
  renderDay = (month, day) =>{
      this.setState({
        day: day,
        month: month
      })
  }
  logout = () =>{
    localStorage.clear();
    window.location.reload(false);
  }
  refresh = () =>{
    const refresh = JSON.stringify({
      refresh: localStorage.getItem('refresh_token')
    })
    TokenApi.token.refresh(refresh)
            .then(res => {
                if(res !== null){
                    localStorage.setItem('access_token', res.access);
                    localStorage.setItem('refresh_token', res.refresh);
                }
            })
  }
  render(){
    return (
      <div className="App">
        <button onClick={this.refresh}>Refresh</button>
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
                    <NavLink to="/calendar">Calendar</NavLink>
                    <NavLink to="/saved">Saved products and meals</NavLink>
                    <button onClick={this.logout}>Log out</button>
                  </nav>
                </div>
              </div>
              <div id="main_container">
                <Route 
                  path="/profile" 
                  render={(props) => <Profile {...props} handleChange={this.changeInfo} />}
                />
                <Route 
                  path="/calendar" 
                  render={(props) => <CalendarComp {...props} getDay={this.renderDay} />}
                />
                <Route path="/saved" component={Products}/>
                <Route 
                  path={'/' + this.state.day + this.state.month}
                  component={CalendarDay}
                />
              </div>
             </div>
          </HashRouter>
      </div>
    );
  }
}

export default Main;

