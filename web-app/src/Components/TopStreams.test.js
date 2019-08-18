import React from 'react';
import ReactDOM from 'react-dom';
import {TopStreams} from './TopStreams';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopStreams/>, div);
    ReactDOM.unmountComponentAtNode(div);
});


function renderTopStreams(streamList) {
    return shallow(<TopStreams streams={streamList}/>);
}


function expectTextInElements(topStreams, selector, textList) {
    expect(topStreams.find(selector).map(node => node.text())).toEqual(textList);
}

it('renders a list of stream objects', () => {

    const topStreams = renderTopStreams([
        {name: 'name1'},
        {name: 'name2'}
    ]);

    expectTextInElements(topStreams, 'section#top-streams span.stream', ['name1', 'name2']);
});

it('readers a list of shows', () => {

    const shows = ['show1', 'show2', 'show3'];
    const topStreams = renderTopStreams([
        {name: 'name1', shows} // Note: does not yet pass when adding second stream object.
    ]);

    expectTextInElements(topStreams, 'section#top-streams li.streamShows', shows);
});