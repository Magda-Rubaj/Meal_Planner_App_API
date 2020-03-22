import React, { Component } from 'react';
import Main from "./Main";
import Guest from "./Guest";
import '../App.css';
import UserApi from '../api/UserApi.js';
class App extends Component {
  constructor(){
    super();
    this.state = {
       logged: false
    };
  }
  componentDidMount(){
    UserApi.user.getUser()
      .then(res => {
        if(res !== null){
          this.setState({
            logged: true
          })
        }
      })
  }
  login = callback =>{
    this.setState({
      logged: callback
    })
    console.log(callback);
  }
  render(){
    if(this.state.logged === true){
      return <Main/>
    }
    else{
      return <Guest handleLogin={this.login}/>
    }
  }
}

export default App;

