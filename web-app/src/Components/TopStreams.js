import React from 'react';

export const TopStreams = ({streams}) => {

    return (

        <section id="top-streams">
            { streams && streams.map(name => (
                <span key={name} className="stream">{name}</span>
            )) }
        </section>

//         Example:
//         <section id="top-streams">
//         { streams && streams.map(streams => (
//             <span key={name} className="stream">{streams.name}</span>
//         )) }
//          </section>

    )

};

// For next time:
//  Assume that streams is no longer a ['name1', 'name2] but instead is a list of objects:
//  [
//     { 'name': 'name1', shows: [{name: 'show name 1', ...}] },
//     ...
//  ]
