import React, { Component } from 'react';
import InputField from '../form-elements/form-input';
import Button from '../form-elements/form-button';
import Choices from '../form-elements/form-choices';
import WPAPI from '../../tools/wpapi';

import '../../css/external/pure-forms.css';
import '../../css/components/forms/form-base.css';

class CompetitionForm extends Component {
    constructor() {
        super()

        this.state = {
            formKey: 'form-' + Date.now()
        };
    }

    save(event) {
        event.preventDefault();

        const slug = this.createSlug(this.refs.name.state.value, this.refs.slug.state.value);

        WPAPI.competition().create({
            parent: this.refs.parentCompetition.state.value,
            name: this.refs.name.state.value,
            slug: slug,
            taxonomy: 'sp_league',
        }).then(this.props.onSave).catch(this.props.onError);

        this.clearForm();
    }

    createSlug(name, slug) {
        if (slug.trim().length) {
            return slug;
        }

        return name
            .normalize('NFKD')
            .replace(/[\u0300-\u036F]/g, '')
            .replace(' ', '-')
            .toLowerCase();
    }

    cancel(event) {
        event.preventDefault();

        this.clearForm();
    }

    clearForm() {
        this.setState({formKey: 'form-' + Date.now()});
    }

    prepareOptions() {
        const comps = this.props.competitions;
        const list = Object.keys(comps).map(this.createOptionsList.bind(this, comps));

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
        const options = this.prepareOptions();

        return (
            <div className="competition-form component--form" key={this.state.formKey}>
                <h3 className="competition-form__title"></h3>
                <form className="competition-form__fields pure-form pure-form-aligned">
                    <fieldset>
                    <InputField ref="name" id="name" name="Competition name" required="true" focus="true"/>
                    <InputField ref="slug" id="slug" name="Slug" />
                    <Choices
                        ref="parentCompetition"
                        id="parentCompetition"
                        name="Parent competition"
                        options={options}
                        emptyOptionLabel="Select a parent competition" />
                    <div className="competition-form__buttons">
                        <Button onClick={this.cancel.bind(this)} type="button" id="cancel" name="Cancel" />
                        <Button onClick={this.save.bind(this)} type="button" id="save" name="Save" />
                    </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

CompetitionForm.PropTypes = {
    competitions: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onError: React.PropTypes.func.isRequired,
};

export default CompetitionForm;
