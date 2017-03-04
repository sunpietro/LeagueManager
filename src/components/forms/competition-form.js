import React, { Component } from 'react';
import InputField from '../form-elements/form-input';
import FormButton from '../form-elements/form-button';
import Firebase from '../../tools/firebase';

import '../../css/components/competitions/competition-form.css';

class CompetitionForm extends Component {
    constructor() {
        super()

        this.state = {
            formKey: 'form-' + Date.now()
        };
    }

    componentWillMount() {
        let competitionsRef = Firebase.database().ref('competitions').orderByKey();

        competitionsRef.on('child_added', snapshot => console.log('form:child_added', snapshot));
    }

    save(event) {
        event.preventDefault();
        console.log('save');

        Firebase.database().ref('competitions').push({
            fullname: this.refs.fullname.state.value,
            shortname: this.refs.shortname.state.value
        });

        this.clearForm();
    }

    cancel(event) {
        event.preventDefault();
        console.log('cancel', arguments);

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
                    <InputField ref="fullname" id="fullname" name="Full competition name" required="true" />
                    <InputField ref="shortname" id="shortname" name="Short competition name" />
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
