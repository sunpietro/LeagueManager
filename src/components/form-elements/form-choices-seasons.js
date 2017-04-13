import React, { Component } from 'react';
import Choices from '../form-elements/form-choices';
import WPAPI from '../../tools/wpapi';

class FormChoicesSeasons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
            options: []
        };
    }

    componentDidMount() {
        Promise.all([
            WPAPI.season().perPage(100)
        ]).then(this.updateState.bind(this))
    }

    updateState([seasons]) {
        this.setState({
            key: Date.now(),
            options: this.prepareOptions(this.groupSeasonsByParent(seasons))
        });
    }

    groupSeasonsByParent(seasons) {
        let groupedSeasons = {};

        seasons.forEach(season => {
            season.key = `season-${season.parent}|${season.id}`;

            if (!season.parent) {
                season.seasons = [];

                if (groupedSeasons[season.id] && groupedSeasons[season.id].seasons) {
                    season.seasons = groupedSeasons[season.id].seasons;
                }

                groupedSeasons[season.id] = season;
            } else {
                if (!groupedSeasons[season.parent]) {
                    groupedSeasons[season.parent] = {seasons: []};
                }

                groupedSeasons[season.parent].seasons.push(season);
            }
        });

        return groupedSeasons;
    }

    prepareOptions(seasons) {
        let list = Object.keys(seasons).map(this.createOptionsList.bind(this, seasons));

        list = [].concat.apply([], list);

        list.sort(this.sortByName);

        return list;
    }

    sortByName(a, b) {
        return a.name.localeCompare(b.name);
    }

    createOptionsList(comps, id) {
        const comp = comps[id];
        let list = [{
            key: comp.id,
            name: comp.name,
        }];

        if (comp.seasons.length) {
            list = [...list, ...comp.seasons.map(subcomp => {
                return {
                    key: subcomp.id,
                    name: `-- ${subcomp.name}`,
                };
            })];
        }

        return list;
    }

    render() {
        return (
            <div className="form-choices--seasons" key={this.state.key}>
                <Choices
                    id={this.props.id}
                    key={this.state.key}
                    name={this.props.name}
                    value={this.props.value}
                    hidden={this.props.hidden}
                    options={this.state.options}
                    required={this.props.required}
                    disabled={this.state.disabled}
                    selectedOption={this.props.selectedOption}
                    emptyOptionLabel={this.props.emptyOptionLabel}
                />
            </div>
        );
    }
}

FormChoicesSeasons.PropTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    hidden: React.PropTypes.bool,
    options: React.PropTypes.arrayOf(React.PropTypes.object),
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    selectedOption: React.PropTypes.any,
    emptyOptionLabel: React.PropTypes.string.isRequired,
};

export default FormChoicesSeasons;
