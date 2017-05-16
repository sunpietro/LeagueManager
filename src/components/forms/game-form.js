import React, { Component } from 'react';
import DateTime from 'react-datetime';
import Choices from '../form-elements/form-choices';
import Button from '../form-elements/form-button';
import InputField from '../form-elements/form-input';
import WPAPI from '../../tools/wpapi';

// https://github.com/YouCanBookMe/react-datetime

import PolishLocale from 'moment/locale/pl'; // eslint-disable-line

import '../../css/external/pure-forms.css';
import '../../css/components/forms/form-base.css';
import '../../css/external/react-datetime.css';

class GameForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: Date.now(),
            homeTeams: [],
            awayTeams: [],
            competitions: [],
            seasons: [],
            rawTeams: [],
            rawSeasons: [],
            rawCompetitions: [],
        };
    }

    save(event) {
        event.preventDefault();

        const homeTeam = this.state.rawTeams.find(team => team.id.toString() === this.refs.homeTeam.state.value);
        const awayTeam = this.state.rawTeams.find(team => team.id.toString() === this.refs.awayTeam.state.value);
        const gameTitle = `${homeTeam.title.rendered} ${this.refs.homeTeamScore.state.value}-${this.refs.awayTeamScore.state.value} ${awayTeam.title.rendered}`;
        const slug = this.createSlug(gameTitle, '');
        const homeScore = this.refs.homeTeamScore.state.value;
        const awayScore = this.refs.awayTeamScore.state.value;
        const winner = this.getWinner({
            id: homeTeam.id,
            score: homeScore,
        }, {
            id: awayTeam.id,
            score: awayScore,
        });
        const homeOutcome = winner === null ? 'draw' : (winner === homeTeam.id ? 'win' : 'lose');
        const awayOutcome = winner === null ? 'draw' : (winner === awayTeam.id ? 'win' : 'lose');
        const results = {
            [homeTeam.id]: {
                firsthalf: '',
                secondhalf: '',
                outcome: [homeOutcome],
                goals: homeScore,
            },
            [awayTeam.id]: {
                firsthalf: '',
                secondhalf: '',
                outcome: [awayOutcome],
                goals: awayScore
            }
        };

        WPAPI.game().create({
            competition: [this.refs.competition.state.value],
            season: [this.refs.season.state.value],
            teams: [homeTeam.id, awayTeam.id],
            date: this.refs.gameDate.state.selectedDate.format(),
            date_gmt: this.refs.gameDate.state.selectedDate.utc().format(),
            format: 'league',
            results: results,
            winner: winner,
            title: gameTitle,
            content: '',
            status: 'publish',
            author: 1,
            minutes: 36,
            slug: slug,
            type: 'sp_event',
            outcome: [
                homeOutcome,
                awayOutcome
            ],
            main_results: [homeScore, awayScore],
        }).then(this.props.onSave).catch(this.props.onError);

        this.clearForm();
    }

    getWinner(home, away) {
        const hScore = parseInt(home.score, 10);
        const aScore = parseInt(away.score, 10);

        if (hScore > aScore) {
            return home.id;
        } else if (hScore < aScore) {
            return away.id;
        } else {
            return null;
        }
    }

    createSlug(name, slug) {
        if (slug.trim().length) {
            return slug;
        }

        return name.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');
    }

    cancel(event) {
        event.preventDefault();

        this.clearForm();
    }

    clearForm() {
        this.setState({key: Date.now()});
    }

    componentDidMount() {
        const promises = [
            WPAPI.team().perPage(100),
            WPAPI.competition().perPage(100),
            WPAPI.season().perPage(100),
        ];

        Promise
            .all(promises)
            .then(this.updateFormOptions.bind(this))
            .catch(this.handleError.bind(this));
    }

    updateFormOptions(result) {
        const [rawTeams, rawCompetitions, rawSeasons] = result;
        let competitions = this.groupCompetitionsByParent(rawCompetitions);
        let teams = rawTeams.map(this.createOptions);
        let seasons = rawSeasons.map(this.createOptions);

        competitions = Object.keys(competitions).map(this.createCompetitionOptions.bind(this, competitions));
        competitions = [].concat.apply([], competitions);

        teams.sort(this.sortByName);
        seasons.sort(this.sortByName);

        this.setState({
            competitions,
            seasons,
            homeTeams: teams,
            awayTeams: teams,
            rawTeams,
            rawSeasons,
            rawCompetitions
        });
    }

    createOptions(item) {
        return {
            key: item.id,
            name: item.name || item.title.rendered
        };
    }

    createCompetitionOptions(comps, id) {
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

    sortByName(a, b) {
        return a.name.localeCompare(b.name);
    }

    handleError(error) {
        console.log('[ERROR] game:form:error', error);
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

    updateTeamsOptions(result) {
        let teams = this.state.rawTeams.map(this.createOptions).filter(team => team.key.toString() !== result.value);

        teams.sort();

        if (result.id === 'homeTeam') {
            this.setState({awayTeams: teams});
        } else {
            this.setState({homeTeams: teams});
        }
    }

    render() {
        const componentClass = 'component component--game-form component--form';
        const defaultSeason = window.localStorage.getItem('spDefaultSeason');
        const defaultCompetition = window.localStorage.getItem('spDefaultCompetition');
        const homeTeamAttrs = {
            id: 'homeTeam',
            ref: 'homeTeam',
            name: 'Home team',
            options: this.state.homeTeams,
            onChange: this.updateTeamsOptions.bind(this),
            emptyOptionLabel: 'Select a home team',
        };
        const awayTeamAttrs = {
            id: 'awayTeam',
            ref: 'awayTeam',
            name: 'Away team',
            options: this.state.awayTeams,
            onChange: this.updateTeamsOptions.bind(this),
            emptyOptionLabel: 'Select an away team',
        };
        const homeTeamScoreAttrs = {
            id: 'homeTeamScore',
            ref: 'homeTeamScore',
            name: '',
            type: 'number'
        };
        const awayTeamScoreAttrs = {
            id: 'awayTeamScore',
            ref: 'awayTeamScore',
            name: '',
            type: 'number'
        };
        const competetitionAttrs = {
            id: 'competition',
            ref: 'competition',
            name: 'Competition',
            value: defaultCompetition,
            options: this.state.competitions,
            selectedOption: defaultCompetition,
            emptyOptionLabel: 'Select a competition'
        };
        const seasonAttrs = {
            id: 'season',
            ref: 'season',
            name: 'Season',
            value: defaultSeason,
            options: this.state.seasons,
            selectedOption: defaultSeason,
            emptyOptionLabel: 'Select a season'
        };
        const gameDateAttrs = {
            id: 'gameDate',
            ref: 'gameDate',
            name: 'Date',
            dateFormat: 'DD/MM/YYYY',
            timeFormat: 'HH:mm',
            closeOnSelect: true,
            defaultValue: new Date(),
            className: 'form__field'
        };
        const saveBtnAttrs = {
            id: 'save',
            name: 'Save',
            onClick: this.save.bind(this),
        };
        const cancelBtnAttrs = {
            id: 'cancel',
            name: 'Cancel',
            onClick: this.cancel.bind(this),
        };

        return (
            <div className={componentClass} key={this.state.key}>
                <form className="game-form__fields pure-form pure-form-aligned">
                    <fieldset>
                        <div className="game-form__compseason">
                            <Choices {...competetitionAttrs} />
                            <Choices {...seasonAttrs} />
                        </div>
                        <Choices {...homeTeamAttrs} />
                        <InputField {...homeTeamScoreAttrs} />
                        <InputField {...awayTeamScoreAttrs} />
                        <Choices {...awayTeamAttrs} />
                        <div className="pure-control-group">
                            <label htmlFor={gameDateAttrs.ref}>Game date</label>
                            <DateTime {...gameDateAttrs} />
                        </div>
                        <div className="component--form__buttons">
                            <Button {...cancelBtnAttrs} />
                            <Button {...saveBtnAttrs} />
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default GameForm;
