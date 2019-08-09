import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {TopStreams} from './Components/TopStreams';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import nock from 'nock';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the TopStreams component', () => {
    const scope = nock('http://localhost:9000')
        .get('/streams/top')
        .reply(200, {
            streams: [{
                name: 'stream1'
            }, {
                name: 'stream2'
            }]
        });

    const wrapper = shallow(<App />);
    
    expect(wrapper
            .find(TopStreams)
            .props()
            .streams
           ).toEqual(['name1','name2']);

});

// TODO: Next for after 8/4:
// 1. Find how to 'expect' values of attributes on a component.

// 2. Then, consider asynchronous complications with React components.
// Look at the axious get request in App.js.
// Start with the Jest asynchronous documentation. Read that thoroughly.



