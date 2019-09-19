import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {TopStreams} from './Components/TopStreams';
import {Player} from './Components/Player';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {getAllRequestData} from "./utils/testUtilities";

configure({adapter: new Adapter()});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the TopStreams component', async () => {

    getAllRequestData();

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

    getAllRequestData();

    const wrapper = shallow(<App/>);
    await wrapper.instance().componentDidMount();

    expect(wrapper.find(Player)).toHaveLength(1);
});




