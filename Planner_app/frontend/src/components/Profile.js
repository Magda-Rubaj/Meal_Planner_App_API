import React, { Component } from 'react';
import UserApi from '../api/UserApi.js';
import UsernameChange from "./UsernameChange";
import CurrWeightChange from "./CurrWeightChange";
import DesWeightChange from "./DesWeightChange";
import AvatarChange from "./AvatarChange";


class Profile extends Component {

        constructor(){
            super();
            this.state = {
                username: "",
                currentWeight: "",
                desiredWeight: "",
                avatar: ""
            };
        }

        componentWillMount() {
          UserApi.user.getUser()
          .then(user => {
              this.setState({
                username: user.username,
                currentWeight: user.currentWeight,
                desiredWeight: user.desiredWeight,
                avatar: user.avatar
              })
          });
        }

        fetchToServer = (body, request, property, value) => {
          UserApi.user.patchUser(request)
          .then(res =>{
            console.log(res);
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
              <div className="profile_wrapper">
                <h2>Profile</h2>
                <div className="user_info">
                    <div className="info_left">
                      <div className="info_block">
                        <h5>Username</h5>
                        <h6>{this.state.username}</h6>
                        <UsernameChange  
                          handleFetch={this.fetchToServer} 
                          prev={this.state}
                        />
                      </div>
                      <div className="info_block">
                        <h5>Current Weight</h5>
                        <h6>{this.state.currentWeight}</h6>
                        <CurrWeightChange
                          handleFetch={this.fetchToServer} 
                          prev={this.state}
                        />
                      </div>
                      <div className="info_block">
                        <h5>Desired Weight</h5>
                        <h6>{this.state.desiredWeight}</h6>
                        <DesWeightChange
                          handleFetch={this.fetchToServer} 
                          prev={this.state}
                        />
                      </div>
                    </div>
                    <div className="info_right">
                      <img src={this.state.avatar} alt="avatar" height="100" width="100"/>
                      <AvatarChange 
                        handleFetch={this.fetchToServer} 
                        prev={this.state}
                      />
                    </div>
                </div>
              </div>
            );
          }
}

export default Profile;