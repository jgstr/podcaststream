import React from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {retryDelay: axiosRetry.exponentialDelay, retries: 20});

export default class StreamerStatus extends React.Component {
    state = {
        status: ""
    };

    // TODO This needs to move elsewhere
    componentDidMount() {

        console.log("Going to get server status");

        axios.get(`http://localhost:9000/server-status`).then( res => {
            console.log(res);
            this.setState({status: res.data.status});
        });

    }

    render() {
        return (
            <span className="streamer-status">
                {this.state.status}
            </span>
        )

    }
}