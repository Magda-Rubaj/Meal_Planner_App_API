import React, { Component } from 'react';
import { NavLink } from "react-router-dom";


class Nav extends Component {

    logout = () => {
        localStorage.clear();
        window.location.reload(false);
    }
   
    render(){
        return (
            <div id="side_container">
                <div id="nav_wrapper">
                <nav>
                    <p>Home</p>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/calendar">Calendar</NavLink>
                    <NavLink to="/saved">Saved products and meals</NavLink>
                    <button onClick={this.logout}>Log out</button>
                </nav>
                </div>
            </div>
        );
    }
}
export default Nav;