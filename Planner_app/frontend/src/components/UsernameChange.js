import React, { Component } from 'react';
import Popup from "reactjs-popup";


class UsernameChange extends Component {

    constructor(){
        super();
        this.state = {
            username: ""
        }
    }

    onNameChange = (e) => {
        this.setState({
          username: e.target.value
        });
    }
    handleSave = (e) => {
        e.preventDefault();
        const request = JSON.stringify({
            "username": this.state.username
        })
        this.props.handleFetch(this.state, request, 'username', this.state.username);
        this.setState({
            username: ""
        })
    }
    render(){
        return (
            <div>
                <Popup modal trigger={<button>Change name</button>}>
                    <form onSubmit={this.handleSave}>
                        Change name:<br/>
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={this.onNameChange}
                        /><br/>
                        <input type="submit" value="Save"/>
                    </form>
                </Popup>
            </div>
        );
    }
}
export default UsernameChange;