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
            <h2 className="CurrentUser-name">{this.props.currentUser.name}</h2>
            {/* <a className="CurrentUser--logout" onClick={this.props.onLogout}>
            Logout
            </a> */}
        </div>
        );
    }
}

export default CurrentUser;