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
      ProductApi.products.getProducts()
        .then(products => products.filter(x => x.owner === parseInt(localStorage.getItem('user_id'))))
        .then(filtered => {
          this.setState({
            products:filtered
          });
        })
    }
    addProduct = (request) =>{
      ProductApi.products.postProduct(request)
            .then(res => {
              console.log(res.status);
              if(res.status===201){
                this.setState(prevState => ({
                  products: [...prevState.products, JSON.parse(request)]
                }))
              }
            })
    }
    render() {
        return (
         <div>
            <h2>Saved products and meals</h2>
            <div id="products_wrapper">
              {this.state.products.map(product => <p key={product.id}>{product.name}</p>)}
            </div>
            <ProductSave saveMeal={this.addProduct}/>               
         </div>
        );
      }
}

export default Products;