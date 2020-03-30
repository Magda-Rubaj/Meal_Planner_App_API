import React, { Component } from 'react';
import Popup from "reactjs-popup";

class CalendarDay extends Component {

    constructor(){
        super();
        this.state = {
            mealList: [],
            shoppingList: [],
            added: ""
        }
    }
    addItem = e =>{
        this.setState({
            added: e.target.value
        })
    }
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
                <Popup modal trigger={<button>Add Meal</button>}>
                    <form onSubmit={this.addShoppingItem}>
                        <input 
                            type="text"
                            value={this.state.added}
                            onChange={this.addItem}
                        />
                        <input type="submit" value="Add"/>
                    </form>
                </Popup> 
            </div>
        );
    }
}
export default CalendarDay;