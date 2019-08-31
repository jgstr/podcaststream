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
        })
        .get('/streams/1234') // TODO: Refactor nock. Currently, each test needs ALL GET requests
        .times(3)             // which encumbers the test with redundancy.
        .reply(200, {
            playerStream: {
                name: 'Name 1',
                length: '2200'
            }
        });


    const wrapper = shallow(<App/>);
    await wrapper.instance().componentDidMount();

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

it('renders the Player component', async () => {

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
        })
        .get('/streams/1234')
        .times(3)
        .reply(200, {
            playerStream: {
                name: 'Name 1',
                length: '2200'
            }
        });

    const wrapper = shallow(<App/>);
    await wrapper.instance().componentDidMount();

    expect(wrapper.find(Player)).toHaveLength(1);
});




