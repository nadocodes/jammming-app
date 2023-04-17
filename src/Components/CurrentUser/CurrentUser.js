import React from "react";
import "./CurrentUser.css";

class CurrentUser extends React.Component {

    render() {
        return (
        <div>
            {this.props.currentUser === null ? <div className="CurrentUser login" onClick={this.props.login}>Login</div>
            : <div className="CurrentUser">
                <img
                className="CurrentUser-image"
                src={this.props.currentUser.image}
                alt={this.props.currentUser.name}
                />
                <h2 className="CurrentUser-name"><a target="_blank" rel="noreferrer" href={`https://open.spotify.com/user/${this.props.currentUser.id}`}>{this.props.currentUser.name}</a></h2>
                <div className="logout" onClick={this.props.onLogout}>
                Logout
                </div>
            </div>}
        </div>
        );
    }
}

export default CurrentUser;