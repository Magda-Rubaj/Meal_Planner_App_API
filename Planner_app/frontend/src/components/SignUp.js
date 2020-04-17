import React, { Component } from 'react';
import UserApi from '../api/UserApi.js';


class SignUp  extends Component{
    
    constructor(){
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            currentWeight: null,
            desiredWeight: null
        }
    }
    onEmailChange = e => {
        this.setState({
            email: e.target.value
        });
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
    onCurrWeightChange = e => {
        this.setState({
            currentWeight: e.target.value
        });
    }
    onDesWeightChange = e => {
        this.setState({
            currentWeight: e.target.value
        });
    }
    register = (e) =>{
        e.preventDefault();
        const user = JSON.stringify({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            currentWeight: this.state.currentWeight,
            desiredWeight: this.state.desiredWeight,
          })
        UserApi.user.postUser(user);      
    }
    render() {
        return (
         <div>
             <h3>Sign Up</h3>
             <form onSubmit={this.register}>
             <h5>Email</h5>
                <input 
                    type="email"
                    value={this.state.email}
                    onChange={this.state.onEmailChange}
                /><br/>
                <h5>Username</h5>
                <input 
                    type="username"
                    value={this.state.username}
                    onChange={this.state.onUsernameChange}
                /><br/>
                <h5>Password</h5>
                <input 
                    type="password"
                    value={this.state.password}
                    onChange={this.state.onPasswordChange}
                /><br/>
                <h5>Current Weight</h5>
                <input 
                    type="number"
                    value={this.state.currentWeight}
                    onChange={this.state.onCurrWeightChange}
                /><br/>
                <h5>Desired Weight</h5>
                <input 
                    type="number"
                    value={this.state.desiredWeight}
                    onChange={this.state.onDesWeightChange}
                /><br/>
                <input type="submit" value="Sign Up"/><br/>
            </form>
         </div>
        );
    }
}

export default SignUp;