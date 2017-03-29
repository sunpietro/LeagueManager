import React, { Component } from 'react';
import Choices from '../form-elements/form-choices';
import InputField from '../form-elements/form-input';
import Button from '../form-elements/form-button';
import WPAPI from '../../tools/wpapi';

class PositionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: Date.now(),
        }
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

    save() {
        WPAPI.position().create({
            parent: this.refs.group.state.value || 0,
            name: this.refs.name.state.value,
            slug: this.createSlug(this.refs.name.state.value, ''),
            taxonomy: 'sp_position',
        }).then(this.props.onSave).catch(this.props.onError);

        this.cancel();
    }

    cancel() {
        this.setState({
            key: Date.now(),
        });
    }

    prepareGroupOptions(groups) {
        let groupOptions = [];

        groupOptions = Object.keys(groups).map(id => {
            return {
                key: id,
                name: groups[id].name
            };
        });

        return groupOptions;
    }

    render() {
        const componentClass = 'component component--position-form';
        const nameAttrs = {
            id: 'name',
            ref: 'name',
            name: 'Position name',
            type: 'text'
        };
        const groupAttrs = {
            id: 'group',
            ref: 'group',
            name: 'Position group',
            options: this.prepareGroupOptions(this.props.positions),
            emptyOptionLabel: 'No group',
        };

        return (
            <div className={componentClass}>
                <form className="position-form__fields" key={this.state.key}>
                    <InputField {...nameAttrs} />
                    <Choices {...groupAttrs} />
                    <div className="position-form__buttons">
                        <Button onClick={this.cancel.bind(this)} type="button" id="cancel" name="Cancel" />
                        <Button onClick={this.save.bind(this)} type="button" id="save" name="Save" />
                    </div>
                </form>
            </div>
        );
    }
}

export default PositionForm;
