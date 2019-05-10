import React from 'react';
import logo from './logo.svg';
import './App.css';
import Things from './Components/Things.js';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Things />
      </div>
    );
  }
}

export default App;
