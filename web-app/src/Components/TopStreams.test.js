import React from 'react';
import ReactDOM from 'react-dom';
import {TopStreams} from './TopStreams';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopStreams />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders a list of streams', () => {
    const div = document.createElement('div');
    // Use enzyme function here instead
    ReactDOM.render(<TopStreams streams={['name1', 'name2']}/>, div);
    // Use assertion/checker here.
    // at least get test to fail correctly
    
});