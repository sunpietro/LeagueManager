import React, { Component } from 'react';
import InputField from '../form-elements/form-input';
import FormButton from '../form-elements/form-button';
import WPAPI from '../../tools/wpapi';

import '../../css/components/competitions/competition-form.css';

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
            parent: 0,
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

        return name.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');
    }

    cancel(event) {
        event.preventDefault();

        this.clearForm();
    }

    clearForm() {
        this.setState({formKey: 'form-' + Date.now()});
    }

    render() {
        return (
            <div className="competition-form__wrapper" key={this.state.formKey}>
                <h3 className="competition-form__title"></h3>
                <form className="competition-form__fields">
                    <InputField ref="name" id="name" name="Competition name" required="true" focus="true"/>
                    <InputField ref="slug" id="slug" name="Slug" />
                    <div className="competition-form__buttons">
                        <FormButton onclick={this.cancel.bind(this)} type="button" id="cancel" name="Cancel" />
                        <FormButton onclick={this.save.bind(this)} type="button" id="save" name="Save" />
                    </div>
                </form>
            </div>
        );
    }
}

export default CompetitionForm;
