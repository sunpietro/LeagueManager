import React, { Component } from 'react';
import Header from '../page-elements/header';
import Profile from '../page-elements/profile';
import Nav from '../page-elements/nav';
import NavToggle from '../page-elements/nav-toggle';
import LoadingScreen from '../page-elements/loading-screen';

import '../../css/external/pure-base.css';
import '../../css/layouts/default.css';

class DefaultLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: false
        };
    }

    componentDidMount() {
        document.title = `League Manager - ${this.props.subtitle}`;
    }

    toggleSidebar() {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        });
    }

    render() {
        const layoutCssClass = `component component--default-layout ${'' + this.props.className}`;
        const layoutSidebarCssStateClass = this.state.isCollapsed ? 'default-layout--has-sidebar-collapsed' : '';
        const layoutCssStateClass = this.props.isLoading ?
            `${layoutCssClass} component--is-loading ${layoutSidebarCssStateClass}` :
            `${layoutCssClass} ${layoutSidebarCssStateClass}`;

        return (
            <div className={layoutCssStateClass}>
                <div className="default-layout__sidebar">
                    <NavToggle onClick={this.toggleSidebar.bind(this)} />
                    <Nav />
                    <Profile />
                </div>
                <div className="default-layout__content">
                    <Header subtitle={this.props.subtitle} />
                    {this.props.children}
                    <LoadingScreen />
                </div>
            </div>
        );
    }
}

DefaultLayout.PropTypes = {
    subtitle: React.PropTypes.string.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    className: React.PropTypes.string
};

export default DefaultLayout;
