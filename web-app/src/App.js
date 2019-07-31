import React from 'react';
import './App.css';
import StreamerStatus from './Components/StreamerStatus.js';
import {TopStreams} from "./Components/TopStreams";
import axios from "axios";
import axiosRetry from 'axios-retry';

axiosRetry(axios, {retryDelay: axiosRetry.exponentialDelay, retries: 20});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {status: ""};
  }

  componentDidMount() {
    axios.get(`http://localhost:9000/server-status`).then( res => {
      console.log(res);
      this.setState({status: res.data.status});
    });

  }

  render(){

    return (
      <div className="App">
        <StreamerStatus status={this.state.status}/>
        <TopStreams streams={['name1', 'name2']}/>
      </div>
    );
  }
}

export default App;
