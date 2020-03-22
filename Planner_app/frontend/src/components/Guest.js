import React, { Component } from 'react';
import {
    Route,
    NavLink,
    HashRouter,
    Redirect
} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";


class Guest extends Component {
    constructor(){
        super();
        this.state = {
            logged: false
        }
    }
    login = callback =>{
        this.setState({
            logged: callback
        })
        console.log(callback)
        this.props.handleLogin(callback);
    }
    render(){
        return (
            <div>
                <HashRouter>
                    <div id="wrapper">
                    <NavLink to="/signup">SignUp</NavLink>
                    <NavLink to="/signin">SignIn</NavLink>
                    </div>
                    <div id="content">
                    <Route path="/signup" component={SignUp}/>
                    <Route 
                        path="/signin" 
                        render={(props) => <SignIn {...props} handleChange={this.login} />}
                    />
                    <Redirect to="/signin" />
                    </div>
                </HashRouter>
            </div>
        );
    }
}

export default Guest;