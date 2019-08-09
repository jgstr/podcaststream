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
      this.setState({status: res.data.status});
    });

  // Step 2 - Use axios.get() to call the /streams/top URL and receive the fake
  // data from nock.

  // I'm confused about this: Don't we need nock here to mock the server? Not in App.test?

  // Pretend const scope = nock( ... ) goes here and mocks the app server.

    axious.get(`http://localhost:9000/streams/top`).then( res => {
      // something similar to `this.state = {streams: res}` here?
    });

  // This is also the part Nimrod said to watch out for. componentDidMount will
  // cause troubles involving 1) re-rendering or 2) asynchronous code (the /streams/
  // request).
  }

  render(){ // this needs access to responses from get() requests. Look at this.state

    return (
      <div className="App">
        <StreamerStatus status={this.state.status}/>
        <TopStreams streams={['name1', 'name2']}/> <!-- something like {this.state.streams} ?-->
      </div>
    );
  }
}

export default App;
