import React, { Component } from 'react';
import Popup from "reactjs-popup";

class Products extends Component{

    constructor(){
        super();
        this.state = {
          products: []
        }
    }
    componentWillMount() {
      fetch('http://127.0.0.1:8000/api/products')  
        .then(res => res.json())
        .then(products => products.filter(x => x.owner===this.props.userId))
        .then(filtered => {
          this.setState({
            products:filtered
          });
        })
        .catch(e => {
          console.log(e);
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
      fetch('http://127.0.0.1:8000/api/products/',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: added
          })
            .then(response => response.json())
            .then(() => {
              this.setState(prevState => ({
                products: [...prevState.products, JSON.parse(added)]
              }))
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