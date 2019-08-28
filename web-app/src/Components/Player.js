import React from 'react';

export const Player = ({streamProperties}) => {
    return (
        <section id="player">
            <h1 className="streamProperty">{streamProperties.name}</h1>
            <span className="streamProperty">{streamProperties.length}</span>
        </section>
    );
}