import React, { Component } from 'react';
import Popup from "reactjs-popup";
import UserApi from '../api/UserApi.js';

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
          UserApi.user.getUser()
          .then(user => {
              this.setState({
                id: user.id,
                name: user.name,
                currentWeight: user.currentWeight,
                desiredWeight: user.desiredWeight
              })
          });
        }
        onNameChange = (e) => {
          e.preventDefault();
          const arg = this.state;
          this.setState({
            name: document.getElementById("name").value
          }, ()=>{this.fetchToServer(arg)
          });
        }

        onCurrWeightChange = (e) => {
          e.preventDefault();
          const arg = this.state;
          this.setState({
            currentWeight: document.getElementById("current").value
          }, ()=>{this.fetchToServer(arg)
          });
        }
        
        onDesWeightChange = (e) => {
          e.preventDefault();
          const arg = this.state;
          this.setState({
            desiredWeight: document.getElementById("desired").value
          }, ()=>{this.fetchToServer(arg)
          });
        }

        fetchToServer = a => {
          const user = JSON.stringify({
            "name": this.state.name,
            "currentWeight":this.state.currentWeight,
            "desiredWeight":this.state.desiredWeight
          })
          UserApi.user.putUser(user)
          .then(res =>{
            if(res.status!==200){
              this.setState({
                name:a.name,
                currentWeight:a.currentWeight,
                desiredWeight:a.desiredWeight
              })
              this.props.handleChange(this.state);
            }
          })
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
                          <input type="text" id="name"/><br/>
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