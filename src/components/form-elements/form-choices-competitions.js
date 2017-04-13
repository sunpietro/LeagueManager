import React, { Component } from 'react';
import Choices from '../form-elements/form-choices';
import WPAPI from '../../tools/wpapi';

class FormChoicesCompetitions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: Date.now(),
            disabled: true,
            options: [],
            rawData: [],
        };
    }

    componentDidMount() {
        Promise.all([
            WPAPI.competition().perPage(100)
        ]).then(this.updateState.bind(this))
    }

    updateState([competitions]) {
        this.setState({
            key: Date.now(),
            disabled: false,
            options: this.prepareOptions(this.groupCompetitionsByParent(competitions)),
            rawData: competitions
        });
    }

    groupCompetitionsByParent(competitions) {
        let groupedCompetitions = {};

        competitions.forEach(competition => {
            competition.key = `comp-${competition.parent}|${competition.id}`;

            if (!competition.parent) {
                competition.competitions = [];

                if (groupedCompetitions[competition.id] && groupedCompetitions[competition.id].competitions) {
                    competition.competitions = groupedCompetitions[competition.id].competitions;
                }

                groupedCompetitions[competition.id] = competition;
            } else {
                if (!groupedCompetitions[competition.parent]) {
                    groupedCompetitions[competition.parent] = {competitions: []};
                }

                groupedCompetitions[competition.parent].competitions.push(competition);
            }
        });

        return groupedCompetitions;
    }

    prepareOptions(competitions) {
        const list = Object.keys(competitions).map(this.createOptionsList.bind(this, competitions));

        return [].concat.apply([], list);
    }

    createOptionsList(comps, id) {
        const comp = comps[id];

        let list = [{
            key: comp.id,
            name: comp.name,
        }];

        if (comp.competitions.length) {
            list = [...list, ...comp.competitions.map(subcomp => {
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
            <div className="form-choices--competitions" key={this.state.key}>
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

FormChoicesCompetitions.PropTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    hidden: React.PropTypes.bool,
    options: React.PropTypes.arrayOf(React.PropTypes.object),
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    selectedOption: React.PropTypes.any,
    emptyOptionLabel: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
};

export default FormChoicesCompetitions;
