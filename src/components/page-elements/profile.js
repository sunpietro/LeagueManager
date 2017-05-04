import React, { Component } from 'react';

import '../../css/components/page-elements/profile.css';

class Profile extends Component {
    render() {
        return (
            <div className="component--profile">
                <div className="profile__app-logo-wrapper">
                    <img className="profile__app-logo" width="32" height="32" src="/img/logo.png" alt="" />
                </div>
                <div className="profile__user">
                    <div className="profile__user-name">Piotr Nalepa</div>
                    <img className="profile__user-image" width="32" height="32" src="/img/user.jpg" alt="" />
                </div>
            </div>
        );
    }
}

export default Profile;
