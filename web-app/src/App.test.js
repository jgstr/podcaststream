import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {TopStreams} from './Components/TopStreams';
import {Player} from './Components/Player';

import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import nock from 'nock';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the TopStreams component', async () => {

    nock('http://localhost:9000')
        .defaultReplyHeaders({"access-control-allow-origin": "*"})
        .get('/streams/top')
        .times(3)
        .reply(200, {
            streams: [{
                name: 'name1'
            }, {
                name: 'name2'
            }]
        })
        .get('/server-status')
        .times(3)
        .reply(200, {
            status: "Up"
        });


    const wrapper = shallow(<App/>);
    await wrapper.instance().componentDidMount(); // Await and async are confusing.

    expect(wrapper
        .find(TopStreams)
        .props()
        .streams
    ).toEqual([
        {
            name: 'name1'
        }, {
            name: 'name2'
        }
    ]);

});

it('renders the Player component', () => { // Review async/await. Do I need it here?

    const wrapper = shallow(<App/>);

    expect(wrapper
        .find(Player)
        .text()
    ).toEqual('Player');
});




