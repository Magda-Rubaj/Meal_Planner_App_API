import React, { Component } from 'react';
import Calendar from 'react-calendar';
import {
    Route,
    NavLink,
    HashRouter,
    Redirect
  } from "react-router-dom";
import CalendarDay from './CalendarDay';


class CalendarComp extends Component {

    constructor(){
        super();
        this.state = {
            month:"",
            day:""
        }
       
    }
    click = (value, event) => {
        const date = JSON.stringify(value);
        const month = date.slice(6,8);
        const day = parseInt(date.slice(9,11))+1;
        this.props.getDay(month, day);
        this.props.history.push('/' + day + month);
    }
    render(){
        return (
            <div>
                <Calendar onClickDay={this.click}/>        
            </div>
        );
    }
}
export default CalendarComp;