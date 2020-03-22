import React, { Component } from 'react';
import Popup from "reactjs-popup";
import ProductApi from '../api/ProductApi'
class Products extends Component{

    constructor(){
        super();
        this.state = {
          products: []
        }
    }
    componentWillMount() {
      ProductApi.products.getProducts()
        .then(products => products.filter(x => x.owner === localStorage.getItem('user_id')))
        .then(filtered => {
          this.setState({
            products:filtered
          });
        })
    }
    addProduct = (e) =>{
      e.preventDefault();
      const added = JSON.stringify({
        id: this.state.products.length,
        name: document.getElementById("name").value,
        calories: document.getElementById("kcal").value,
        carbohydrates: document.getElementById("carbs").value,
        protein: document.getElementById("protein").value,
        fat: document.getElementById("fat").value,
        owner: this.props.userId  
      })
      ProductApi.products.postProduct(added)
            .then(res => {
              console.log(res.status);
              if(res.status===201){
                this.setState(prevState => ({
                  products: [...prevState.products, JSON.parse(added)]
                }))
              }
            })
    }
    render() {
        return (
         <div>
             <h2>Saved products and meals</h2>
             <Popup modal trigger={<button>Add product/meal</button>}>
                        <form onSubmit={this.addProduct}>
                          Name:<br/>
                          <input type="text" id="name"/><br/>
                          Calories:<br/>
                          <input type="number" id="kcal"/><br/>
                          Carbohydrates:<br/>
                          <input type="number" id="carbs"/><br/>
                          Protein:<br/>
                          <input type="number" id="protein"/><br/>
                          Fat:<br/>
                          <input type="number" id="fat"/><br/>
                          <input type="submit" value="Save"/>
                        </form>
            </Popup>
             <div id="products_wrapper"></div>
             {this.state.products.map(product => <p key={product.id}>{product.name}</p>)}
         </div>
        );
      }
}

export default Products;