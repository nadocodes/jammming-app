import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playId: '',
        };
        this.currentPlayId = this.currentPlayId.bind(this);
        this.isInPlaylist = this.isInPlaylist.bind(this);
    }

    isInPlaylist(track) {
        let tracksIn = this.props.tracksInPlaylist;
        if (!tracksIn) {
            return;
        }
        return (tracksIn.find(savedTrack => (savedTrack.id === track.id))) ? true : false;
    }

    currentPlayId(id) {
        this.setState({playId: id});
    }

    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        if (!this.isInPlaylist(track)) {
                            return <Track track={track} 
                            key={track.id}
                            id={track.id} 
                            onAdd={this.props.onAdd} 
                            onRemove={this.props.onRemove} 
                            isRemoval={this.props.isRemoval} 
                            playID={this.currentPlayId}
                            nowPlaying={this.state.playId}
                            />
                        } else {
                            return null;
                        }
                    })
                }
            </div>
        );
    }
}

export default TrackList;