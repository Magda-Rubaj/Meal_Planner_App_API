import React, { Component } from 'react';
import Popup from "reactjs-popup";


class ProductSave extends Component {

    constructor(){
        super();
        this.state = {
           name: "",
           calories: 0,
           carbs: 0,
           protein: 0,
           fat: 0
        }
    }

    onNameChange = (e) => {
        this.setState({
          name: e.target.value
        });
    }
    onCaloriesChange = (e) => {
        this.setState({
          calories: e.target.value
        });
    }
    onCarbsChange = (e) => {
        this.setState({
          carbs: e.target.value
        });
    }
    onProteinsChange = (e) => {
        this.setState({
          protein: e.target.value
        });
    }
    onFatsChange = (e) => {
        this.setState({
          fat: e.target.value
        });
    }
    handleSave = (e) => {
        e.preventDefault();
        const request = JSON.stringify({
            name: this.state.name,
            calories: this.state.calories,
            carbohydrates: this.state.carbs,
            protein: this.state.protein,
            fat: this.state.fat,
            owner: localStorage.getItem('user_id')  
        })
        this.props.saveMeal(request)
        this.setState({
            name: "",
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0
        })   
    }
    render(){
        return (
            <div>
                <Popup modal trigger={<button>Add product/meal</button>}>
                    <form onSubmit={this.handleSave}>
                            Name:<br/>
                            <input 
                                type="text"
                                value={this.state.name}
                                onChange={this.onNameChange}
                            /><br/>
                            Calories:<br/>
                            <input 
                                type="number"
                                value={this.state.calories}
                                onChange={this.onCaloriesChange}
                            /><br/>
                            Carbohydrates:<br/>
                            <input 
                                type="number"
                                value={this.state.carbs}
                                onChange={this.onCarbsChange}
                            /><br/>
                            Protein:<br/>
                            <input 
                                type="number"
                                value={this.state.protein}
                                onChange={this.onProteinsChange}
                            /><br/>
                            Fat:<br/>
                            <input 
                                type="number"
                                value={this.state.fat}
                                onChange={this.onFatsChange}
                            /><br/>
                            <input type="submit" value="Save"/>
                    </form>
                </Popup>
            </div>
        );
    }
}
export default ProductSave;