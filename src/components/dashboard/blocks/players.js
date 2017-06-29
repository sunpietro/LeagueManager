import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PlayerItem from './player-item';
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

    renderPlayerItem(teams, positions, player) {
        const meta = {
            key: player.id,
            player,
            teams,
            positions
        };

        return <PlayerItem {...meta} />;
    }

    checkIsLoading() {
        const { players, teams, positions } = this.props;

        return players.isLoading || teams.isLoading || positions.isLoading;
    }

    render() {
        const blockCssClass = 'component--dashboard-block dashboard-block--players';
        const isLoading = this.checkIsLoading();
        const loadingStateCssClass = isLoading ? `${blockCssClass} component--is-loading` : blockCssClass;
        let players = [];
        let teams = [];
        let positions = [];

        if (!isLoading) {
            players = this.props.players.items;
            positions = this.props.positions.items;
            teams = this.props.teams.items;
        }

        return (
            <div className={loadingStateCssClass}>
                <h3 className="dashboard-block__title">Players</h3>
                <div className="dashboard-block__content">
                    {!isLoading && players.map(this.renderPlayerItem.bind(this, teams, positions))}
                </div>
                <LoadingScreen />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, playerActionCreators), dispatch);
const mapStateToProps = (state) => {
    return {
        positions: state.positions,
        players: state.players,
        teams: state.teams
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersDashboardBlock);
