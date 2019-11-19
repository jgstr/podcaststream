/**
 * Functions to help common tasks for testing.
 */
import {shallow} from "enzyme/build";
import {TopStreams} from "../Components/TopStreams";
import React from "react";
import nock from "nock";

/**
 *
 * @param streamList
 * @returns {ShallowWrapper}
 */
export const renderTopStreams = streamList => {
    return shallow(<TopStreams streams={streamList}/>);
};

/**
 *
 * @param component
 * @param selector
 * @param textList
 */
export const expectTextInElements = (component, selector, textList) => {
    expect(component.find(selector).map(node => node.text())).toEqual(textList);
};

/**
 * Uses the nock GET/reply feature. Intercepts request() from node and replies with pre-defined HTTP responses.
 */
export const getAllRequestData = () => {
    nock('http://localhost:9000')
        .defaultReplyHeaders({"access-control-allow-origin": "*"})
        .get('/get-all')
        .times(3)
        .reply(200,{
            status: "Up",
            streams: [{
                name: 'name1'
            }, {
                name: 'name2'
            }],
            playerStream: {
                name: 'Name 1',
                length: '2200'
            }
        });
};
