import React, { Component } from 'react';
import UserApi from '../api/UserApi.js';
import UsernameChange from "./UsernameChange";
import CurrWeightChange from "./CurrWeightChange";
import DesWeightChange from "./DesWeightChange";


class Profile extends Component {

        constructor(){
            super();
            this.state = {
                username: "",
                currentWeight: "",
                desiredWeight: ""
            };
        }

        componentWillMount() {
          UserApi.user.getUser()
          .then(user => {
              this.setState({
                username: user.username,
                currentWeight: user.currentWeight,
                desiredWeight: user.desiredWeight
              })
              console.log(user);
          });
        }

        fetchToServer = (body, request, property, value) => {
          UserApi.user.patchUser(request)
          .then(res =>{
            if(res.status === 200){
              this.setState({
                [property]: value
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
                    <h5>USERNAME:</h5>
                    <p>{this.state.username}</p>
                    <UsernameChange  
                      handleFetch={this.fetchToServer} 
                      prev={this.state}
                    />
                    <h5>CURRENT WEIGHT:</h5>
                    <p>{this.state.currentWeight}</p>
                    <CurrWeightChange
                      handleFetch={this.fetchToServer} 
                      prev={this.state}
                    />
                    <h5>DESIRED WEIGHT:</h5>
                    <p>{this.state.desiredWeight}</p>
                    <DesWeightChange
                      handleFetch={this.fetchToServer} 
                      prev={this.state}
                    />
                </div>
              </div>
            );
          }
}

export default Profile;