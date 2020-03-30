import React, { Component } from 'react';
import UserApi from '../api/UserApi.js';


class SignUp  extends Component{
    
    register = (e) =>{
        e.preventDefault();
        const user = JSON.stringify({
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            currentWeight: document.getElementById("currWeight").value,
            desiredWeight: document.getElementById("desWeight").value,
          })
        UserApi.user.postUser(user);      
    }
    render() {
        return (
         <div>
             <form onSubmit={this.register}>
                <input type="email" id="email"/><br/>
                <input type="text" id="username"/><br/>
                <input type="password" id="password"/><br/>
                <input type="number" id="currWeight"/><br/>
                <input type="number" id="desWeight"/><br/>
                <input type="submit" value="Sign Up"/><br/>
            </form>
         </div>
        );
    }
}

export default SignUp;