import React, { Component } from 'react';
import Header from '../page-elements/header';
import Nav from '../page-elements/nav';
import Profile from '../page-elements/profile';
import LoadingScreen from '../page-elements/loading-screen';

import '../../css/layouts/default.css';

class DefaultLayout extends Component {
    componentDidMount() {
        document.title = `League Manager - ${this.props.subtitle}`;
    }

    render() {
        return (
            <div className="component component--default-layout">
                <div className="default-layout__sidebar">
                    <Profile />
                    <Nav />
                </div>
                <div className="default-layout__content">
                    <Header subtitle={this.props.subtitle} />
                    {this.props.children}
                    <LoadingScreen />
                </div>
                <div className="default-layout__footer">
                    <p>Copyright &copy; {(new Date()).getFullYear()} Piotr Nalepa - LeagueManager</p>
                </div>
            </div>
        );
    }
}

DefaultLayout.PropTypes = {
    subtitle: React.PropTypes.string.isRequired,
    isLoading: React.PropTypes.bool.isRequired
};

export default DefaultLayout;
