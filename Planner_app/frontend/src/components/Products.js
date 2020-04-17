import React, { Component } from 'react';
import ProductApi from '../api/ProductApi'
import ProductSave from './ProductSave'
class Products extends Component{

    constructor(){
        super();
        this.state = {
          products: []
        }
    }
    componentWillMount() {
      ProductApi.products.getProducts(localStorage.getItem('user_id'))
        .then(res => {
          this.setState({
            products: res
          });
        })
    }
    addProduct = (request, added) =>{
      ProductApi.products.postProduct(request)
            .then(res => {
              console.log(res);
              if(res.status===201){
                const newOne = {
                  id: this.state.products.length,
                  name: added.name,
                  image: 'http://127.0.0.1:8000/media/post_images/' + added.image.name,
                  calories: added.calories,
                  carbohydrates: added.carbs,
                  protein: added.protein,
                  fat: added.fat,
                  owner: localStorage.getItem('user_id')  
              }
                this.setState(prevState => ({
                  products: [...prevState.products, newOne]
                }))
              }
            })
    }
    render() {
        return (
         <div className="meals_wrapper">
            <h2>Saved meals</h2>
            <div className="meal_container">
              {this.state.products.map(product => 
                <figure key={product.id}>
                  <img src={product.image} alt="meal" height="85" width="85"/>
                  <figcaption>{product.name}</figcaption>
                </figure>
              )}
              <ProductSave saveMeal={this.addProduct}/> 
            </div>              
         </div>
        );
      }
}

export default Products;