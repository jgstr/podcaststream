import React from 'react';

export const TopStreams = ({streams}) => {

    return (

        <section id="top-streams">
            { streams && streams.map(name => (
                <span key={name} className="stream">{name}</span>
            )) }
        </section>

    )

};