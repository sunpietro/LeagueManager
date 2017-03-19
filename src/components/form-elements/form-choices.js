import React, { Component } from 'react';

import '../../css/components/form-elements/form-choices.css';

class FormChoices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.initDefaultValue('value'),
            hidden: this.initDefaultValue('hidden'),
            required: this.initDefaultValue('required'),
            disabled: this.initDefaultValue('disabled'),
        };
    }

    initDefaultValue(key) {
        const values = {
            value: '',
            hidden: false,
            required: false,
            disabled: false,
        };

        return typeof this.props[key] !== 'undefined' ? this.props[key] : values[key];
    }

    renderOption(option) {
        return <option key={option.key} value={option.key}>{option.name}</option>;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        let className = 'form-choices';
        let attrs = {
            id: this.props.id,
            ref: this.props.id,
            name: this.props.id,
            onChange: this.handleChange.bind(this),
            className: 'form-choices__field',
        };

        if (typeof this.props.selectedOption !== 'undefined' && this.props.selectedOption.length) {
            attrs.defaultValue = this.props.selectedOption;
        }

        if (this.state.hidden) {
            className += ' form-choices--hidden';
        }

        if (this.state.required) {
            className += ' form-choices--required';
        }

        if (this.state.disabled) {
            className += ' form-choices--disabled';
        }

        return (
            <div className={className}>
                <label className="form-choices__label" htmlFor={this.props.id}>{this.props.name}</label>
                <select {...attrs}>
                    <option value="0" key="0">{this.props.emptyOptionLabel}</option>
                    {this.props.options.map(this.renderOption.bind(this))}
                </select>
            </div>
        );
    }
}

FormChoices.PropTypes = {
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

export default FormChoices;
