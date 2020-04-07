import React, { Component } from 'react';
import Popup from "reactjs-popup";
import Select from 'react-select';
import ProductApi from '../api/ProductApi'
import PlannedMealsApi from '../api/PlannedMealsApi'

class DailyMeals extends Component {

    constructor(){
        super();
        this.state = {
            mealList: [],
            mealChoice: [],
            selectedMeal: null,
            totalCalories: 0,
            totalCarbs: 0,
            totalProtein: 0,
            totalFats: 0,
            quantity: 0
        }
    }
    componentWillMount(){
        PlannedMealsApi.plannedMeals.getPlannedMeals()
            .then(meals => meals.filter(x => x.owner === parseInt(localStorage.getItem('user_id'))))
            .then(meals => meals.filter(x => x.date === parseInt(this.props.date)))
            .then(meals => meals.map(x => {
                ProductApi.products.getSingleProduct(x.meal)
                .then(res => {
                    const modified = ({ id: res.id, key: meals.length, value: res.name, label: res.name });
                    this.setState(prevState => ({
                        mealList: [...prevState.mealList, modified],
                    }))
                    
                })
            }))
        ProductApi.products.getProducts()
            .then(products => products.filter(x => x.owner === parseInt(localStorage.getItem('user_id'))))
            .then(filtered => filtered.map(x => ({ id: x.id, key: filtered.length, value: x.name, label: x.name })))
            .then(options => {
                this.setState({
                    mealChoice: options
                });
            }) 
    }

    addMeal = e =>{
        console.log(this.props.date);
        const meal = JSON.stringify({
            owner: parseInt(localStorage.getItem('user_id')),
            meal: this.state.selectedMeal.id,
            date: this.props.date
        });

        console.log(meal);
        PlannedMealsApi.plannedMeals.postPlannedMeal(meal);
        this.setState(prevState => ({
            mealList: [...prevState.mealList, this.state.selectedMeal],
            selectedMeal: null
          }))
        
    }
    handleChange = selected => {
        this.setState({ selectedMeal: selected });
    }
    render(){
        return (
            <div>
                 {this.state.mealList.map(meal => <p key={meal.key}>{meal.value}</p>)}
                <Popup modal trigger={<button>Add Meal</button>}>
                    <div>
                        <form>
                            <Select
                                value={this.state.selectedMeal}
                                options={this.state.mealChoice}
                                onChange={this.handleChange}
                            />
                            <input type="number"/>
                            <button onClick={this.addMeal}>Add</button> 
                        </form>
                   </div>    
                </Popup>       
            </div>
        );
    }
}
export default DailyMeals;