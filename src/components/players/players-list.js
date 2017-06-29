import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';
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

const PlayerIdCell = ({rowIndex, players, ...props}) => (<Cell {...props}>{players[rowIndex].id}</Cell>);
const PlayerNameCell = ({rowIndex, players, ...props}) => (<Cell {...props}>{players[rowIndex].title.rendered}</Cell>);
const PlayerPositionCell = ({rowIndex, players, positions, ...props}) => {
    const player = players[rowIndex];
    const playerPositions = player.position.length ?
        player.position :
        (player.player_meta.sp_position ? player.player_meta.sp_position : []);
    let positionName = '';

    if (playerPositions.length) {
        const playerPosition = parseInt(playerPositions[0], 10);

        positionName = positions.find(pos => pos.id === playerPosition).name;
    }

    return (<Cell {...props}>{positionName}</Cell>);
};

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

    renderTable() {
        const players = this.props.players.items;
        const positions = this.props.positions.items;
        const fullWidth = this.state.dimensions.width;
        const fractionDenominator = 4;
        const height = 50;
        const idWidth = 50;
        const baseWidth = fullWidth - 50;
        const nameWidth = Math.ceil((baseWidth * 3) / fractionDenominator);
        const positionWidth = Math.floor((baseWidth * 1 - 50) / fractionDenominator);

        console.log('renderTable', players);

        return (
            <Table
                width={fullWidth}
                maxHeight={400}
                rowHeight={height}
                rowsCount={players.length}
                headerHeight={height} >
                <Column
                    width={idWidth}
                    header={<Cell>ID</Cell>}
                    cell={<PlayerIdCell players={players} />} />
                <Column
                    width={nameWidth}
                    header={<Cell>Name</Cell>}
                    cell={<PlayerNameCell players={players} />} />
                <Column
                    width={positionWidth}
                    header={<Cell>Position</Cell>}
                    cell={<PlayerPositionCell players={players} positions={positions}/>} />
            </Table>
        );
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

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, playerActionCreators), dispatch);
const mapStateToProps = (state) => {
    return {
        positions: state.positions,
        players: state.players,
        teams: state.teams
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList);
