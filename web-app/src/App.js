import React from 'react';
import logo from './logo.svg';
import './App.css';
import StreamerStatus from './Components/StreamerStatus.js';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Use axios to send a request to the server on /server-status.
  }

  render(){

    return (
      <div className="App">
        <StreamerStatus />
        <StreamerStatus />
      </div>
    );
  }
}

export default App;
