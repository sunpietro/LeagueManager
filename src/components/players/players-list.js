import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';

import * as playerActionCreators from '../../actions/players';
import DefaultLayout from '../layouts/default';
import Button from '../form-elements/form-button';
import Panel from '../page-elements/panel';
import Form from './player-form';

import '../../css/external/fixed-data-table.css';

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
            isPanelVisible: false
        };
    }

    componentWillMount() {
        this.getPlayersList();
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

    renderTable() {
        const players = this.props.players.items;
        const positions = this.props.positions.items;

        return (
            <Table
                width={450}
                maxHeight={400}
                rowHeight={50}
                rowsCount={players.length}
                headerHeight={50} >
                <Column width={50} header={<Cell>ID</Cell>} cell={<PlayerIdCell players={players} />} />
                <Column width={300} header={<Cell>Name</Cell>} cell={<PlayerNameCell players={players} />} />
                <Column width={100} header={<Cell>Position</Cell>} cell={<PlayerPositionCell players={players} positions={positions}/>} />
            </Table>
        );
    }

    render() {
        const isLoading = this.checkIsLoading();

        return (
            <DefaultLayout subtitle="Players" isLoading={isLoading}>
                <Button onClick={this.showForm.bind(this)} type="button" id="show-form" name="Add a player" className="players__btn--add" />
                <Panel isVisible={this.state.isPanelVisible}>
                    <Form
                        {...this.props}
                        className="players__form"
                        onSave={this.getPlayersList.bind(this)}
                        onError={this.handleError.bind(this)} />
                </Panel>
                <div className="players__list">{isLoading ? '' : this.renderTable()}</div>
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
