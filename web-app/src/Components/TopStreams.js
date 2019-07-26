import React from 'react';

export const TopStreams = ({streams}) => {

    // must traverse array of 'streams.' But how?
    // Alternative to for is .map()

    return (
        // Add to notes on React.
        // 1. cannot return arrays as the main returned element, ie, one wrapper tag
        //    example: <ul> <li></li><li></li> </ul>
        // 2. Note the use of &&, no 'if/else' statement in react. Look this up.
        //    'if' in js is NOT an expression, just like 'for' is not.
        //    ? :  is the same as if/else and && is same as if/then.

        <section id="top-streams">
            { streams && streams.map(name => (
                <span key={name} className="stream">{name}</span>
            )) }
        </section>

    )

};