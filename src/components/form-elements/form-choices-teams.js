import React, { Component } from 'react';
import Choices from '../form-elements/form-choices';
import WPAPI from '../../tools/wpapi';

class FormChoicesTeams extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
            disabled: true
        };
    }

    componentDidMount() {
        Promise.all([
            WPAPI.team().perPage(100),
        ]).then(this.updateState.bind(this))
    }

    updateState([teams]) {
        this.setState({
            key: Date.now(),
            disabled: false,
            options: this.prepareOptions(teams)
        });
    }

    prepareOptions(teams) {
        let options = teams.map(team => {
            return {
                key: team.id,
                name: team.title.rendered
            };
        })

        options.sort(this.sortByName);

        return options;
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

        if (comp.teams.length) {
            list = [...list, ...comp.teams.map(subcomp => {
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
            <div className="form-choices--teams" key={this.state.key}>
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

FormChoicesTeams.PropTypes = {
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

export default FormChoicesTeams;
