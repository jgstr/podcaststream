import React from 'react';
import ReactDOM from 'react-dom';
import {TopStreams} from './TopStreams';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopStreams />, div);
    ReactDOM.unmountComponentAtNode(div);
});

// Original test (8/11/2019):

// it('renders a list of streams', () => {
//     const streamNames = ['name1', 'name2'];
//     const topStreams = shallow(<TopStreams streams={streamNames}/>);
//     expect( topStreams.find('section#top-streams span.stream').map((node) => node.text()) )
//                      .toEqual(streamNames);
// });

it('renders a list of stream objects', () => {

    const streamList = [
                            {name: 'name1'},
                            {name: 'name2'}
                         ];

    const topStreams = shallow(<TopStreams streams={streamList}/>);

    expect( topStreams.find('section#top-streams span.stream') // Returns React wrapper of nodes
                      .map( node => node.text() ))
                      .toEqual(streamList); // this needs to test Objects, not strings??
});
