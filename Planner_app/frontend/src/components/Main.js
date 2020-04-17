import React, { Component } from 'react';
import {
  Route,
  HashRouter,
} from "react-router-dom";
import Profile from "./Profile";
import Products from "./Products";
import UserApi from '../api/UserApi.js';
import CalendarComp from './CalendarComp';
import CalendarDay from './CalendarDay';
import Nav from './Nav';
import '../css/Main.css';
import TokenApi from '../api/TokenApi.js';


class Main extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      avatar: null,
      currentWeight: "",
      desiredWeight: "",
      date: 0
    };
  }

  componentWillMount() {
    UserApi.user.getUser()
      .then(user => {
        this.setState({
          username: user.username,
          avatar: user.avatar,
          currentWeight: user.currentWeight,
          desiredWeight: user.desiredWeight
        });
      })
  }
  changeInfo = callback => {
    this.setState({
      username: callback.username,
      currentWeight: callback.currentWeight,
      desiredWeight: callback.desiredWeight
    })
  }
  renderDay = (month, day, year) => {
    this.setState({
      date: day + month + year
    })
  }
  refresh = () => {
    const refresh = JSON.stringify({
      refresh: localStorage.getItem('refresh_token')
    })
    TokenApi.token.refresh(refresh)
      .then(res => {
        if (res !== null) {
          localStorage.setItem('access_token', res.access);
          localStorage.setItem('refresh_token', res.refresh);
        }
      })
  }
  render() {
    return (
      <div className="Main">
        <button className="refresh" onClick={this.refresh}>Refresh</button>
        <HashRouter>
          <div className="wrapper">
            <div className="side_container">
              <div className="info_container">
                <img className="info_item" src={this.state.avatar} alt="avatar" height="90" width="90" />
                <h4 className="info_item">{this.state.username}</h4>
                <div className="weight_wrapper">
                  <h5 className="info_item">{this.state.currentWeight}</h5>
                  <h5 className="info_item">{this.state.desiredWeight}</h5>
                </div>
              </div>
              <Nav />
            </div>
            <div className="main_container">
              <Route
                path="/profile"
                render={(props) => <Profile {...props} handleChange={this.changeInfo} />}
              />
              <Route
                path="/calendar"
                render={(props) => <CalendarComp {...props} getDay={this.renderDay} />}
              />
              <Route path="/saved" component={Products} />
              <Route
                path={'/' + this.state.date}
                render={(props) => <CalendarDay {...props} date={this.state.date} />}
              />
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default Main;

