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
    this.state = {status: ""};
  }

  componentDidMount() {
    axios.get(`http://localhost:9000/server-status`).then( res => {
      console.log('Aaron\'s log: ' + res);
      this.setState({status: res.data.status});
    });

  // Step 2 - Use axios.get() to call the /streams/top URL and receive the fake
  // data from nock.

  // Step 2.B - Save this data in some kind of state, like in the code above,
  // and add it to the TopStreams component below, just like in StreamerStatus.

  // This is also the part Nimrod said to watch out for. componentDidMount will
  // cause troubles involving 1) re-rendering or 2) asynchronous code (the /streams/
  // request).
  }

  render(){ // this needs access to responses from get() requests. Look at this.state

    return (
      <div className="App">
        <StreamerStatus status={this.state.status}/>
        <TopStreams streams={['name1', 'name2']}/>
      </div>
    );
  }
}

export default App;
