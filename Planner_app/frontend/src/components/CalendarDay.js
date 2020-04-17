import React, { Component } from 'react';
import DailyMeals from "./DailyMeals";
import ShoppingList from "./ShoppingList";

class CalendarDay extends Component {

    
    render(){
        return (
            <div>
                <DailyMeals date={this.props.date}/>
                <ShoppingList date={this.props.date}/>
            </div>
        );
    }
}
export default CalendarDay;