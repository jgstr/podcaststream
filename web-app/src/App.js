import React from 'react';
import './App.css';
import StreamerStatus from './Components/StreamerStatus.js';
import {TopStreams} from './Components/TopStreams';
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {retryDelay: axiosRetry.exponentialDelay, retries: 20});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "",
            streams: []
        };
    }

    componentDidMount() {

        return Promise.all([
            axios.get(`http://localhost:9000/server-status`).then(res => {
                this.setState({status: res.data.status});
            }),
            axios.get(`http://localhost:9000/streams/top`).then(res => {
                this.setState({streams: res.data.streams});
            })
        ]);

    }

    render() {

        return (
            <div className="App">
                <StreamerStatus status={this.state.status}/>
                <TopStreams streams={this.state.streams.map(stream => stream.name )}/>
            </div>
        );
    }
}

export default App;
