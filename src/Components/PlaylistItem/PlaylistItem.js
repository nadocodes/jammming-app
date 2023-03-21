import React from "react";
import './PlaylistItem.css';

export default class PlaylistItem extends React.Component {
    render() {
        return (
            <div className="PlaylistItem" onClick={this.props.onClick}>
                <img className="cover"src={this.props.cover} alt={`Cover of ${this.props.name}`} />
                <h3 name={this.props.name}>{this.props.name}</h3>
            </div>
        );
    }
}