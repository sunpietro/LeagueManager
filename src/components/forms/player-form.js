import React, { Component } from 'react';
import Choices from '../form-elements/form-choices';
import Input from '../form-elements/form-input';
import Textarea from '../form-elements/form-textarea';
import Button from '../form-elements/form-button';
import DateTime from 'react-datetime';
import WPAPI from '../../tools/wpapi';
import countries from '../../tools/countries';
import CountrySelect from 'react-country-select';

import '../../css/external/pure-forms.css';
import '../../css/components/forms/form-base.css';

class PlayerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: Date.now(),
            nationality: null,
            positions: [],
            errorMessage: '',
            hasError: false,
        };
    }

    componentDidMount() {
        WPAPI.position().perPage(100)
            .then(this.groupPositionsByParent)
            .then(this.preparePositionsOptions.bind(this))
            .catch(error => console.log(`[ERROR] ${error}`));
    }

    groupPositionsByParent(positions) {
        let groupedPositions = {};

        positions.forEach(position => {
            position.key = `pos-${position.parent}|${position.id}`;

            if (!position.parent) {
                position.positions = [];

                if (groupedPositions[position.id] && groupedPositions[position.id].positions) {
                    position.positions = groupedPositions[position.id].positions;
                }

                groupedPositions[position.id] = position;
            } else {
                if (!groupedPositions[position.parent]) {
                    groupedPositions[position.parent] = {positions: []};
                }

                groupedPositions[position.parent].positions.push(position);
            }
        });

        positions = [];

        Object.keys(groupedPositions).forEach(key => positions.push(groupedPositions[key]));

        return positions;
    }

    preparePositionsOptions(positions) {
        let options = [];
        let createOptionHash = (hasParent = false, total, pos) => {
            let name = hasParent ? `-- ${pos.name}` : pos.name;

            total.push({key: pos.id, name: name});

            if (pos.positions && pos.positions.length) {
                return pos.positions.reduce(createOptionHash.bind(this, true), total);
            }

            return total;
        };

        this.setState({
            key: Date.now(),
            positions: positions.reduce(createOptionHash.bind(this, false), options)
        });
    }

    createSlug(name, slug) {
        if (slug && slug.trim().length) {
            return slug;
        }

        return name
            .normalize('NFKD')
            .replace(/[\u0300-\u036F]/g, '')
            .replace(' ', '-')
            .toLowerCase();
    }

    showError(message) {
        this.setState({
            hasError: true,
            errorMessage: message,
            key: Date.now()
        });
    }

    save() {
        const birthday = this.refs.birthday.state.selectedDate;

        if (!birthday) {
            this.showError('Birthday date has to be set');

            return;
        }

        WPAPI.player().create({
            author: 1,
            title: this.refs.name.state.value,
            content: this.refs.bio.state.value,
            status: 'publish',
            slug: this.createSlug(name),
            type: 'sp_player',
            date: this.refs.birthday.state.selectedDate.format(),
            date_gmt: this.refs.birthday.state.selectedDate.utc().format(),
            player_meta: [{
                key: 'sp_number',
                value: this.refs.number.state.value
            }, {
                key: 'sp_metrics',
                value: {
                    height: this.refs.height.state.value || '180',
                    weight: this.refs.weight.state.value || '70'
                }
            }, {
                key: 'sp_leagues',
                value: {}
            }, {
                key: 'sp_nationality',
                value: this.state.nationality || 'pol'
            }, {
                key: 'sp_current_team',
                value: '57'
            }, {
                key: 'sp_team',
                value: '57'
            }, {
                key: 'sp_position',
                value: this.refs.position.state.value
            }]
        }).then(this.props.onSave).catch(this.props.onError);

        this.cancel();
    }

    cancel() {
        this.setState({
            key: Date.now(),
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.key !== nextState.key;
    }

    handleCountrySelect(result) {
        const countryCode = (countries.find(item => {
            return item.let2.toLowerCase() === result.value.toLowerCase();
        })).let3.toLowerCase();

        this.setState({
            nationality: countryCode
        });
    }

    render() {
        let componentClass = 'component component-form--player component--form';
        let errorNotification = null;
        const nameAttrs = {
            id: 'name',
            ref: 'name',
            name: 'Player name',
            type: 'text'
        };
        const bioAttrs = {
            id: 'bio',
            ref: 'bio',
            name: 'Player bio',
        };
        const jerseyNoAttrs = {
            id: 'number',
            ref: 'number',
            name: 'Jersey number',
            type: 'number',
            maxLength: 2,
        };
        const weightAttrs = {
            id: 'weight',
            ref: 'weight',
            name: 'Weight',
            type: 'number'
        };
        const heightAttrs = {
            id: 'height',
            ref: 'height',
            name: 'Height',
            type: 'number'
        };
        const nationalityAttrs = {
            id: 'nationality',
            ref: 'nationality',
            name: 'Nationality',
            onSelect: this.handleCountrySelect.bind(this),
            flagImagePath: './flags/',
        };
        const positionAttrs = {
            id: 'position',
            ref: 'position',
            name: 'Position',
            options: this.state.positions,
            required: true,
            emptyOptionLabel: 'Select a position'
        };
        const birthdayAttrs = {
            id: 'birthday',
            ref: 'birthday',
            name: 'Birthday',
            dateFormat: 'DD/MM/YYYY',
            timeFormat: 'HH:mm',
            closeOnSelect: true,
            inputProps: {
                placeholder: 'Select a birthday date',
                required: true,
                className: 'form__field-input'
            },
            className: 'form__field'
        };

        if (this.state.hasError) {
            componentClass = `${componentClass} component--has-error`;
            errorNotification = <div className="component_error-message">{this.state.errorMessage}</div>;
        }

        return (
            <div className={componentClass}>
                {errorNotification}
                <form className="player-form__fields pure-form pure-form-aligned" key={this.state.key}>
                <fieldset>
                    <Input {...nameAttrs} />
                    <Textarea {...bioAttrs} />
                    <Input {...jerseyNoAttrs} />
                    <Input {...heightAttrs} />
                    <Input {...weightAttrs} />
                    <div className="pure-control-group">
                        <label htmlFor={nationalityAttrs.ref}>Nationality</label>
                        <CountrySelect {...nationalityAttrs} />
                    </div>
                    <Choices {...positionAttrs} />
                    <div className="pure-control-group">
                        <label htmlFor={birthdayAttrs.ref}>Birthday</label>
                        <DateTime {...birthdayAttrs} />
                    </div>
                    <div className="player-form__buttons">
                        <Button onClick={this.cancel.bind(this)} type="button" id="cancel" name="Cancel" />
                        <Button onClick={this.save.bind(this)} type="button" id="save" name="Save" />
                    </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default PlayerForm;
