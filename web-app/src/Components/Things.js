import React from 'react';
import axios from 'axios';

export default class Things extends React.Component {
    state = {
        status: ""
    };

    componentDidMount() {

        console.log("Going to get server status");

        axios.get(`http://localhost:9000/server-status`).then( res => {
            console.log(res);
            this.setState({status: res.data.status});
        });
    }

    render() {
        return (
            <span id="go-status">
                {this.state.status}
            </span>
        )

    }
}