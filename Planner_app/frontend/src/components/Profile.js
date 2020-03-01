import React, { Component } from 'react';
import Popup from "reactjs-popup";

class Profile extends Component {
        constructor(){
            super();
            this.state = {
                name: "",
                currentWeight: "",
                desiredWeight: ""
            };
        }
        componentWillMount() {
          fetch('http://127.0.0.1:8000/api/users/1')
            .then(res => res.json())
            .then(user => {
              this.setState({
                id: user.id,
                name: user.name,
                currentWeight: user.currentWeight,
                desiredWeight: user.desiredWeight
              });
            }) 
            .catch(e => {
              console.log(e);
            })            
        }
        onNameChange = (e) => {
          e.preventDefault();
          this.setState({
            name: document.getElementById("name").value
          }, ()=>{this.fetchToServer()
          });
        }

        onCurrWeightChange = (e) => {
          e.preventDefault();
          this.setState({
            currentWeight: document.getElementById("current").value
          }, ()=>{this.fetchToServer()
          });
        }
        
        onDesWeightChange = (e) => {
          e.preventDefault();
          this.setState({
            desiredWeight: document.getElementById("desired").value
          }, ()=>{this.fetchToServer()
          });
        }

        fetchToServer(){
          this.props.handleChange(this.state);
          fetch('http://127.0.0.1:8000/api/users/1/',{
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              "name": this.state.name,
              "currentWeight":this.state.currentWeight,
              "desiredWeight":this.state.desiredWeight
            })
          })
            .then(response => response.json())
            .then(json => console.log(json))
        }

          render() {
            return (
              <div id="profile_wrapper">
                <h2>Profile</h2>
                <div id="informations">
                    <h5>NAME:</h5>
                    <p>{this.state.name}</p>
                    <Popup modal trigger={<button>Change name</button>}>
                        <form onSubmit={this.onNameChange}>
                          Change name:<br/>
                          <input type="text"id="name"/><br/>
                          <input type="submit" value="Save"/>
                        </form>
                    </Popup>
                    <h5>CURRENT WEIGHT:</h5>
                    <p>{this.state.currentWeight}</p>
                    <Popup modal trigger={<button>Change current weight</button>}>
                        <form onSubmit={this.onCurrWeightChange}>
                          Change current weight:<br/>
                          <input type="number"id="current"/><br/>
                          <input type="submit" value="Save"/>
                        </form>
                    </Popup>
                    <h5>DESIRED WEIGHT:</h5>
                    <p>{this.state.desiredWeight}</p>
                    <Popup modal trigger={<button>Change desired weight</button>}>
                        <form onSubmit={this.onDesWeightChange}>
                          Change desired weight:<br/>
                          <input type="number"id="desired"/><br/>
                          <input type="submit" value="Save"/>
                        </form>
                    </Popup>
                </div>
              </div>
            );
          }
}

export default Profile;