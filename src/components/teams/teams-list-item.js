import React, { Component } from 'react';

class TeamListItem extends Component {
    renderTeam(team) {
        return <div/>
    }

    render() {
        return (
            <div className="component component--team-list-item">
                <h3 className="component--team-list-item__title">{this.props.team.title.rendered}</h3>
            </div>
        );
    }
}

TeamListItem.PropTypes = {
    name: React.PropTypes.string.isRequired,
    teams: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default TeamListItem;
