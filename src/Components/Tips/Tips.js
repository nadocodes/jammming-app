import React from "react";
import "./Tips.css";

class Tips extends React.Component {
    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                        <div className="modal-close" onClick={this.props.closeTips}>
                        X
                        </div>
                    <div className="modal-header">
                        <h2>Tips</h2>
                    </div>
                    <div className="modal-body">
                        <ul>
                            <li className="tip">
                                <h3>Login:</h3>
                                <p>Click login or search for a song to authenticate and follow Spotify's authentication process.</p>
                            </li>
                            <li className="tip">
                                <h3>Search:</h3>
                                <p>Use the search bar and type in the title, album or artist name to quickly locate a song on your site.</p>
                            </li>
                            <li className="tip">
                                <h3>Results / Add or Remove Songs:</h3>
                                <p>Click the album cover to preview songs and use the + in Results and - buttons to add or remove songs from the playlist section.</p>
                            </li>
                            <li className="tip">
                                <h3>Playlist:</h3>
                                <p>Rename your playlist by editing "Playlist Name" and save it to your Spotify account by clicking "Save To Spotify" after curation. Voila!</p>
                            </li>
                            <li className="tip">
                                <h3>Your Playlists:</h3>
                                <p>Access your previous playlists in "Your Playlists". Clicking on a playlist will replace the playlist section with its songs. Make changes and click "Save To Spotify" to modify the previous playlist.</p>
                            </li>
                        </ul>
                    </div>
                </div>            
            </div>
        );
    }
}

export default Tips;
