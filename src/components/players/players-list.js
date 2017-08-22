import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PlusIcon from 'react-icons/lib/fa/plus';

import * as playerActionCreators from '../../actions/players';
import DefaultLayout from '../layouts/default';
import Button from '../form-elements/form-button';
import Panel from '../page-elements/panel';
import Form from './player-form';
import Player from './players-list-item';
import { spawnNotification } from '../notifications/notification';

import '../../css/external/fixed-data-table.css';
import '../../css/components/players/players-list.css';

class PlayersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPanelVisible: false,
        };
    }

    componentWillMount() {
        this.getPlayersList();
    }

    handleFormSavedState() {
        spawnNotification({
            title: 'The player data has been saved',
            body: 'Everything went well'
        });
    }

    getPlayersList() {
        this.props.fetchPlayers();
    }

    handleError() {
        console.log('[ERROR] players:list:error');
    }

    checkIsLoading() {
        const { players, teams, positions } = this.props;

        return players.isLoading || teams.isLoading || positions.isLoading;
    }

    showForm() {
        this.setState({
            isPanelVisible: true
        });
    }

    renderPlayerItem(teams, positions, player) {
        const team = teams.find(item => item.id === parseInt(player.player_meta.sp_current_team, 10));
        const position = positions.find(position => {
            let playerPositions = (player.positions && player.positions.length) ?
                player.positions :
                (player.player_meta.sp_position ? player.player_meta.sp_position : []);

            return position.id === parseInt(playerPositions[0], 10);
        });

        return <Player key={player.id} player={player} position={position} team={team}/>
    }

    setComponentWidth(dimensions) {
        this.setState({dimensions});
    }

    render() {
        const isLoading = this.checkIsLoading();
        let players = [];
        let teams = [];
        let positions = [];

        if (!isLoading) {
            players = this.props.players.items;
            positions = this.props.positions.items;
            teams = this.props.teams.items;
        }

        return (
            <DefaultLayout subtitle="Players" isLoading={isLoading} className="players">
                <Button onClick={this.showForm.bind(this)} type="button" id="show-form" name="Add a player" className="players__btn--add" icon={<PlusIcon />} />
                <Panel isVisible={this.state.isPanelVisible}>
                    <Form
                        {...this.props}
                        className="players__form"
                        onSave={this.handleFormSavedState.bind(this)}
                        onError={this.handleError.bind(this)} />
                </Panel>
                <div className="players__list">
                    {isLoading ? '' : players.map(this.renderPlayerItem.bind(this, teams, positions))}
                </div>
            </DefaultLayout>
        );
    }
}

PlayersList.propTypes = {
    players: React.PropTypes.object,
    positions: React.PropTypes.object,
    teams: React.PropTypes.object,
    fetchPlayers: React.PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, playerActionCreators), dispatch);
const mapStateToProps = (state) => {
    return {
        positions: state.positions,
        players: state.players,
        teams: state.teams
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList);
