import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {TopStreams} from './TopStreams';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopStreams />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('it renders a list of streams', () => {

    // I don't understand the render() method -- and specifically,
    // why we render in a test. Should not we render from TopStreams.js
    // instead? And then test how TopStreams renders?

    // const div = document.createElement('div');
    // ReactDOM.render(<TopStreams streams={['name1', 'name2']}/>, div);

    // Shallow creates a special 'wrapper' -- read more about this.
    const topStreams = shallow(<TopStreams streams={['name1', 'name2']}/>);

    // What am I testing for? And I'm using chai, but not sure if I'm supposed to...
    expect(topStreams.find('section#top-streams span.stream')).to.have.lengthOf(2);

    // TODO finish: check that each stream contains the correct string. SHOULD FAIL FIRST!!!


});