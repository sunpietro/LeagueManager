import React, { Component } from 'react';
import Choices from '../form-elements/form-choices';
import WPAPI from '../../tools/wpapi';

class FormChoicesSeasons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
            options: [],
            rawData: [],
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
            disabled: false,
            options: this.prepareOptions(this.groupSeasonsByParent(seasons)),
            rawData: seasons,
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

    createOptionsList(seasons, id) {
        const season = seasons[id];
        let list = [{
            key: season.id,
            name: season.name,
        }];

        if (season.seasons.length && this.props.showMatchdays) {
            list = [...list, ...season.seasons.map(subseason => {
                return {
                    key: subseason.id,
                    name: `-- ${subseason.name}`,
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
                    ref="choices"
                    key={this.state.key}
                    name={this.props.name}
                    value={this.props.value}
                    hidden={this.props.hidden}
                    options={this.state.options}
                    required={this.props.required}
                    disabled={this.state.disabled}
                    selectedOption={this.props.selectedOption}
                    emptyOptionLabel={this.props.emptyOptionLabel}
                    onChange={this.props.onChange}
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
    showMatchdays: React.PropTypes.bool,
    onChange: React.PropTypes.func,
};

export default FormChoicesSeasons;
