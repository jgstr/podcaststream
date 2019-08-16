import React from 'react';

export const TopStreams = ({streams}) => {

    return (

        <section id="top-streams">
            {streams && streams.map(stream => (
                <div>
                    <span key={stream.name} className="stream">{stream.name}</span>
                    <ol>
                        {stream.shows && stream.shows.map(
                            show => <li className="streamShows">{show}</li>)
                        }
                    </ol>

                </div>

            ))}
        </section>

    );

};


// <section id="top-streams">
//     { streams && streams.map(stream => (
//         <span key={stream.name} className="stream">{stream.name}</span>
//     )) }
// </section>