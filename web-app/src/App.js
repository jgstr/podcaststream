import React from 'react';
import './App.css';
import StreamerStatus from './Components/StreamerStatus.js';
import {TopStreams} from './Components/TopStreams';
import {Player} from './Components/Player';
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {retryDelay: axiosRetry.exponentialDelay, retries: 20});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "",
            streams: [],
            playerStream: {}
        };
    }

    componentDidMount() {

        return Promise.all([
            axios.get(`http://localhost:9000/get-all`).then(res => {
                const {status, streams, playerStream} = res.data;
                this.setState({status, streams, playerStream});
            })
        ]);

    }

    render() {

        return (
            <div className="App">
                <StreamerStatus status={this.state.status}/>
                <TopStreams streams={this.state.streams}/>
                <Player playerStream={this.state.playerStream}/>
            </div>
        );
    }
}

export default App;
