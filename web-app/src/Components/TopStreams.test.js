import React from 'react';
import ReactDOM from 'react-dom';
// import {expect} from 'chai';  // might be in Jest
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

    // Shallow (from enzyem) creates a special 'wrapper'. All I need to know is that 'shallow'
    // allows me to test one component at a time.
    // TODO Something might be wrong with the way the values pass into 'streams'?
    const topStreams = shallow(<TopStreams streams={['name1', 'name2']}/>);
    console.log("topStreams: " + topStreams);
    expect(topStreams.find('section#top-streams span.stream').map( (node) => node.text() )).toEqual(['name1', 'name2']);

    // TODO I think something is wrong with topStreams. The console returns '{}'.
    // I think TopStreams.js renders the code incorrectly. But I don't know how to test.
    // expect(topStreams.find('#top-streams')).to.have.lengthOf(2);

    // TODO 7/26 clean up:
    //  1. list of names needs to be refactored for non-duplication
    //  2. Clean up other stuff like comments.
    //  Next: Connect TopStreams (ie, test it)

});