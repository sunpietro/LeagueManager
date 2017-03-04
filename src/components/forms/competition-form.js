import React, { Component } from 'react';
import InputField from '../form-elements/form-input';
import FormButton from '../form-elements/form-button';

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
        console.log('save', arguments);
    }

    cancel(event) {
        event.preventDefault();
        console.log('cancel', arguments);

        this.setState({formKey: 'form-' + Date.now()});
    }

    render() {
        return (
            <div className="competition-form__wrapper" key={this.state.formKey}>
                <h3 className="competition-form__title"></h3>
                <form className="competition-form__fields">
                    <InputField id="fullname" name="Full competition name" required="true" />
                    <InputField id="shortname" name="Short competition name" />
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
