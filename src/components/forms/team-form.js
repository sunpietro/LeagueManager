import React, { Component } from 'react';
import Input from '../form-elements/form-input';
import Button from '../form-elements/form-button';
import WPAPI from '../../tools/wpapi';

import '../../css/components/forms/form-base.css';

class TeamForm extends Component {
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
        WPAPI.team().create({
            author: 1,
            title: this.refs.name.state.value,
            status: 'publish',
            slug: this.createSlug(name),
            type: 'sp_team',
            team_meta: [{
                key: 'sp_abbrevation',
                value: this.refs.abbr.state.value
            }, {
                key: 'sp_url',
                value: this.refs.url.state.value
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

    render() {
        let componentClass = 'component component-form--team';
        let errorNotification = null;
        const nameAttrs = {
            id: 'name',
            ref: 'name',
            name: 'Team name',
            type: 'text'
        };
        const abbrAttrs = {
            id: 'abbr',
            ref: 'abbr',
            name: '3 Letter Code',
            maxLength: 3
        };
        const urlAttrs = {
            id: 'url',
            ref: 'url',
            name: 'Team website',
            type: 'url'
        };

        if (this.state.hasError) {
            componentClass = `${componentClass} component--has-error`;
            errorNotification = <div className="component_error-message">{this.state.errorMessage}</div>;
        }

        return (
            <div className={componentClass}>
                {errorNotification}
                <form className="team-form__fields" key={this.state.key}>
                    <Input {...nameAttrs} />
                    <Input {...abbrAttrs} />
                    <Input {...urlAttrs} />
                    <div className="team-form__buttons">
                        <Button onClick={this.cancel.bind(this)} type="button" id="cancel" name="Cancel" />
                        <Button onClick={this.save.bind(this)} type="button" id="save" name="Save" />
                    </div>
                </form>
            </div>
        );
    }
}

export default TeamForm;
