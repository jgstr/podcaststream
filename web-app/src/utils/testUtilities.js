/**
 * Functions to help common tasks for testing.
 */

import {shallow} from "enzyme/build";
import {TopStreams} from "../Components/TopStreams";
import React from "react";

/**
 *
 * @param streamList
 * @returns {ShallowWrapper}
 */
export const renderTopStreams = streamList => {
    return shallow(<TopStreams streams={streamList}/>);
}

/**
 *
 * @param component
 * @param selector
 * @param textList
 */
export const expectTextInElements = (component, selector, textList) => {
    expect(component.find(selector).map(node => node.text())).toEqual(textList);
}
