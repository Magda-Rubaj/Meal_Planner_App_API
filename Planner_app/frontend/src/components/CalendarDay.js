import React, { Component } from 'react';
import DailyMeals from "./DailyMeals";


class CalendarDay extends Component {

 
    addShoppingItem = e => {
        e.preventDefault();
        this.setState(prevState => ({
            shoppingList: [...prevState.shoppingList, JSON.parse(this.state.added)],
            added: ""
          }))
    }
    
    render(){
        return (
            <div>
                <DailyMeals date={this.props.date}/>
            </div>
        );
    }
}
export default CalendarDay;