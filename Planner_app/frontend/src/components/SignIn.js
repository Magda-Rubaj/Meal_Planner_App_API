import React, { Component } from 'react';
import TokenApi from '../api/TokenApi.js';
import jwt from 'jwt-decode'

class SignIn  extends Component{
    constructor(){
        super();
        this.state = {
            logged: false
        }
    }
    login = e =>{
        e.preventDefault();
        const user = JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
        TokenApi.token.obtain(user)
            .then(res => {
                if(res !== null){
                    localStorage.setItem('access_token', res.access);
                    localStorage.setItem('refresh_token', res.refresh);
                    const decoded = jwt(res.access);
                    localStorage.setItem('user_id', decoded.user_id);
                    const logged = true;
                    this.setState({
                        logged: logged
                    });
                    this.props.handleChange(logged);
                }
            })
    }
    render() {
        return (
        <div>
            <form onSubmit={this.login}> 
                <input type="username" id="username"/><br/>
                <input type="password" id="password"/><br/>
                <input type="submit" value="Sign In"/><br/>
            </form>
        </div>
        );
    }
}
export default SignIn;