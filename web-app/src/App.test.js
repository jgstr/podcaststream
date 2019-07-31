import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the TopStreams component', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('TopStreams').length).toEqual(2); // .find() returns 'undefined'
  // during test.

});