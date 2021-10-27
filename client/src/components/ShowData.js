import React, { Component } from 'react';
import axios from 'axios';

export default class ShowData extends Component {

    constructor(props){
        super(props);
        this.state={
            userList: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/api/get').then((response)=>{
            //this.state.userList = response.data
            this.setState({
                userList: response.data
            })
        })
    }

    componentDidUpdate(){
        axios.get('http://localhost:3001/api/get').then((response)=>{
            //this.state.userList = response.data
            this.setState({
                userList: response.data
            })
        })
    }

    render() {
        return (
            <div>
                {/* for testing */}
                <h3>Current Users</h3>
                    {this.state.userList.map((val)=>{
                        return <h4>{val.username}, {val.password}, {val.firstName}, {val.lastName}, {val.email}</h4>
                    })}
            </div>
        )
    }
}
