import React, { Component } from 'react';
import TokenApi from '../api/TokenApi.js';
import jwt from 'jwt-decode'

class SignIn  extends Component{
    constructor(){
        super();
        this.state = {
            logged: false,
            username: "",
            password: "",
        }
    }
    onUsernameChange = e => {
        this.setState({
            username: e.target.value
          });
    }
    onPasswordChange = e => {
        this.setState({
            password: e.target.value
          });
    }
    login = e =>{
        e.preventDefault();
        const user = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
        TokenApi.token.obtain(user)
            .then(res => {
                if(res !== null){
                    localStorage.setItem('access_token', res.access);
                    localStorage.setItem('refresh_token', res.refresh);
                    const decoded = jwt(res.access);
                    localStorage.setItem('user_id', decoded.user_id);
                    this.setState({
                        logged: true
                    });
                    this.props.handleChange(true);
                }
            })
    }
    render() {
        return (
        <div>
            <form onSubmit={this.login}> 
                <input 
                    type="username"
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                /><br/>
                <input 
                    type="username"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                /><br/>
                <input type="submit" value="Sign In"/><br/>
            </form>
        </div>
        );
    }
}
export default SignIn;