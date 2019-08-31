import React from 'react';

export const Player = ({playerStream}) => {
    if(playerStream) {
        return (
            <section id="player">
                <h1 className="streamProperty">{playerStream.name}</h1>
                <span className="streamProperty">{playerStream.length}</span>
            </section>
        );
    } else {
        return (
            <div></div>
        );
    }

}