import React, { Component } from 'react';
import LoadingScreen from '../page-elements/loading-screen';
import Choices from '../form-elements/form-choices';
import Button from '../form-elements/form-button';
import WPAPI from '../../tools/wpapi';

import '../../css/components/forms/form-base.css';

class ConfigForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: Date.now(),
            inProgress: true,
            competitionOptions: [],
            seasonOptions: [],
            defaultSeason: window.localStorage.getItem('spDefaultSeason') || 0,
            defaultCompetition: window.localStorage.getItem('spDefaultCompetition') || 0,
        }
    }

    componentDidMount() {
        const promises = [
            WPAPI.competition().perPage(100),
            WPAPI.season().perPage(100),
        ];

        Promise
            .all(promises)
            .then(this.renderConfigForm.bind(this))
            .catch(this.handleError.bind(this));
    }

    renderConfigForm(result) {
        const competitionOptions = this.prepareCompetitionOptions(this.groupCompetitionsByParent(result[0]));
        const seasonOptions = this.prepareSeasonOptions(result[1]);

        this.setState({
            inProgress: false,
            competitionOptions,
            seasonOptions
        });
    }

    prepareCompetitionOptions(comps) {
        const list = Object.keys(comps).map(this.createCompetitionOptionsList.bind(this, comps));

        return [].concat.apply([], list);
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

    createCompetitionOptionsList(comps, id) {
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

    prepareSeasonOptions(seasons) {
        return seasons.map(item => {
            return {
                key: item.id,
                name: item.name,
            };
        });
    }

    handleError(error) {
        console.log('[ERROR]', error);
    }

    save() {
        const defaultSeason = this.refs.defaultSeason.state.value;
        const defaultCompetition = this.refs.defaultCompetition.state.value;

        window.localStorage.setItem('spDefaultSeason', defaultSeason);
        window.localStorage.setItem('spDefaultCompetition', defaultCompetition);

        this.setState({
            key: Date.now(),
            defaultSeason,
            defaultCompetition,
        });
    }

    cancel() {
        const defaultSeason = window.localStorage.getItem('spDefaultSeason');
        const defaultCompetition = window.localStorage.getItem('spDefaultCompetition');

        this.setState({
            key: Date.now(),
            defaultSeason,
            defaultCompetition,
        });
    }

    render() {
        const componentClass = 'component component--config-form component--form';
        const componentStateClass = !this.state.inProgress ?
            componentClass :
            `${componentClass} component--is-loading`;
        const defaultCompetition = window.localStorage.getItem('spDefaultCompetition');
        const defaultSeason = window.localStorage.getItem('spDefaultSeason');

        return (
            <div className={componentStateClass}>
                <LoadingScreen />
                <form className="config-form__fields pure-form pure-form-aligned" key={this.state.key}>
                    <fieldset>
                        <Choices
                            ref="defaultCompetition"
                            id="defaultCompetition"
                            name="Default competition"
                            options={this.state.competitionOptions}
                            value={defaultCompetition}
                            selectedOption={defaultCompetition}
                            emptyOptionLabel="Select a default competition" />
                        <Choices
                            ref="defaultSeason"
                            id="defaultSeason"
                            name="Default season"
                            options={this.state.seasonOptions}
                            value={defaultSeason}
                            selectedOption={defaultSeason}
                            emptyOptionLabel="Select a default season" />
                        <div className="config-form__buttons">
                            <Button onClick={this.cancel.bind(this)} type="button" id="cancel" name="Cancel" />
                            <Button onClick={this.save.bind(this)} type="button" id="save" name="Save" />
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default ConfigForm;
