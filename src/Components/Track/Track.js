import React from "react";
import "./Track.css";
import PlayButton from './play-button-svgrepo-com.svg';
import PauseButton from './music-player-pause-button-svgrepo-com.svg';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = {play: false};
        this.audio = new Audio(this.props.track.audio);
        this.play = this.play.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    play(volumeLevel) {
        if (this.state.play) {
            this.audio.pause();
            this.setState({play: false});
            this.props.playID('')
        } else {
            this.audio.volume = volumeLevel;
            this.audio.play();
            this.setState({play: true});
            this.props.playID(this.props.track.id)
        }
        this.audio.addEventListener('ended', () => {
            if (this.state.play) {
                this.audio.pause();
                this.setState({play: false});
                this.props.playID('');
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.nowPlaying !== this.props.nowPlaying && this.props.nowPlaying !== this.props.track.id) {
            this.audio.pause();
            this.setState({play: false});
        }
    }

    componentWillUnmount() {
        this.audio.pause();
        this.setState({play: false});
        this.props.playID('')
    }



    render() {
        return (
            <div className="Track">
                <button className="play" onClick={() => this.play(0.5)}>
                    <img src={this.props.track.cover}
                    alt={this.props.track.album}
                    className="cover"/>
                    {this.state.play === false && <img src={PlayButton}
                    alt={`Play ${this.props.track.name}`}
                    className="play-button" />}
                    {this.state.play === true && <img src={PauseButton}
                    alt={`Pause ${this.props.track.name}`}
                    className="pause-button" />}
                </button>
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;