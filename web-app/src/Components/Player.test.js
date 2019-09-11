import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import {expectTextInElements} from "../utils/testUtilities";
import {Player} from "./Player";


it('should renders an Object with stream values', () => {

    const player = shallow(<Player playerStream={{name: 'Name 1', length: '2200'}}/>);
    expectTextInElements(player, '.streamProperty', ['Name 1', '2200']);
})

it('should render without crashing when stream is empty', () => {
    mount(<Player /> );
})

