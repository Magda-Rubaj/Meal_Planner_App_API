import React, { Component } from 'react';
import Popup from "reactjs-popup";


class DesWeightChange extends Component {

    constructor(){
        super();
        this.state = {
            desiredWeight: 0
        }
    }

    onDesWeightChange = (e) => {
        this.setState({
          desiredWeight: e.target.value
        });
    }
    handleSave = (e) => {
        e.preventDefault();
        const request = JSON.stringify({
            "desiredWeight": this.state.desiredWeight
        })
        this.props.handleFetch(this.state, request, 'desiredWeight', this.state.desiredWeight);
        this.setState({
            desiredWeight: 0
        })
    }
    render(){
        return (
            <div>
                <Popup modal trigger={<button>Change desired weight</button>}>
                        <form onSubmit={this.handleSave}>
                            Change desired weight:<br/>
                            <input 
                                type="number"
                                value={this.state.desiredWeight}
                                onChange={this.onDesWeightChange}
                            /><br/>
                          <input type="submit" value="Save"/>
                        </form>
                </Popup>
            </div>
        );
    }
}
export default DesWeightChange;