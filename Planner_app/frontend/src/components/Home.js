import React, { Component } from 'react';
import PieChart from 'react-minimal-pie-chart';
import ProductApi from '../api/ProductApi'
import PlannedMealsApi from '../api/PlannedMealsApi'


class Home extends Component {
    constructor(){
        super();
        this.state = {
            totalCalories: 0,
            totalCarbs: 0,
            totalProtein: 0,
            totalFats: 0
        }
    }
    componentDidMount(){
        const date = new Date();
        const today = date.getDate().toString() + '0'+ (date.getMonth() + 1).toString() + date.getFullYear().toString();
        PlannedMealsApi.plannedMeals.getPlannedMeals(
            `owner=${localStorage.getItem('user_id')}&date=${today}`
            )
            .then(meals => meals.map(x => {
                ProductApi.products.getSingleProduct(x.meal)
                .then(res => {
                    this.setState({
                        totalCalories: this.state.totalCalories + res.calories,
                        totalCarbs: this.state.totalCarbs + res.carbohydrates,
                        totalProtein: this.state.totalProtein + res.protein,
                        totalFats: this.state.totalFats + res.fat,
                    })
                    
                })
            }))
    }

    render(){
        return (
            <div className="home_wrapper">
                <h4>Hi {this.props.username}!</h4>
                <p>Today you've consumed: </p>
                <p>{this.state.totalCalories} Calories</p>
                <p>{this.state.totalCarbs} Carbs</p>
                <p>{this.state.totalProtein} Proteins</p>
                <p>{this.state.totalFats} Fats</p>
                <PieChart
                    data={[
                        { title: 'Carbs', value: this.state.totalCarbs, color: '#00ffa6' },
                        { title: 'Protein', value:  this.state.totalProtein, color: '#8000ff' },
                        { title: 'Fat', value:  this.state.totalFats, color: '#28b0bf' },
                    ]}
                    style={{
                        height: '250px'
                    }}
                    />     
            </div>
        );
    }
}
export default Home;