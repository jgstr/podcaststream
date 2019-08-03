import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {TopStreams} from './Components/TopStreams';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the TopStreams component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.exists('TopStreams')).toEqual(true);

  // TODO: understand 'how deep' shallow() 'renders'

});
