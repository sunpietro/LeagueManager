import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoadingScreen from '../../page-elements/loading-screen';
import * as playerActionCreators from '../../../actions/players';

class PlayersDashboardBlock extends Component {
    componentWillMount() {
        this.getPlayersList();
    }

    getPlayersList() {
        this.props.fetchPlayers({
            limit: 5
        });
    }

    renderPlayerItem() {
        return '';
    }

    render() {
        const blockCssClass = 'component--dashboard-block dashboard-block--players';
        const loadingStateCssClass = this.props.players.isLoading ?
            `${blockCssClass} component--is-loading` :
            blockCssClass;

        return (
            <div className={loadingStateCssClass}>
                <h3 className="dashboard-block__title">Players</h3>
                <div className="dashboard-block__content">

                </div>
                <LoadingScreen />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, playerActionCreators), dispatch);
const mapStateToProps = (state) => {
    return {
        players: state.players
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersDashboardBlock);
