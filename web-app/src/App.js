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
            }),
            axios.get(`http://localhost:9000/streams/1234`).then( res => {
                this.setState({playerStream: res.data.playerStream})
            })
        ]);

    }

    render() {

        return (
            <div className="App">
                <StreamerStatus status={this.state.status}/>
                <TopStreams streams={this.state.streams}/>
                {/*<Player streamProperties={{name: "Name 1", length: "2200"}}/>*/}
                <Player playerStream={this.state.playerStream}/>
            </div>
        );
    }
}

export default App;
