import React from "react";
import "./CurrentUser.css";

class CurrentUser extends React.Component {

    render() {
        return (
        <div className="CurrentUser">
            <img
            className="CurrentUser-image"
            src={this.props.currentUser.image}
            alt={this.props.currentUser.name}
            />
            <h2 className="CurrentUser-name"><a target="_blank" rel="noreferrer" href={`https://open.spotify.com/user/${this.props.currentUser.id}`}>{this.props.currentUser.name}</a></h2>
            {/* <a className="CurrentUser--logout" onClick={this.props.onLogout}>
            Logout
            </a> */}
        </div>
        );
    }
}

export default CurrentUser;