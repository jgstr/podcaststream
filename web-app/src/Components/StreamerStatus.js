import React from 'react';

export default class StreamerStatus extends React.Component {
    render() {
        return (
            <span className="streamer-status">
                {this.props.status}
            </span>
        )
    }
}