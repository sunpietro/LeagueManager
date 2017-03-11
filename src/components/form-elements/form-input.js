import React, { Component } from 'react';

import '../../css/components/form-elements/form-input.css';

class FormInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.initDefaultValue('value'),
            hidden: this.initDefaultValue('hidden'),
            required: this.initDefaultValue('required'),
            disabled: this.initDefaultValue('disabled'),
            maxlength: this.initDefaultValue('maxlength'),
            focus: this.initDefaultValue('focus'),
        };
    }

    initDefaultValue(key) {
        const values = {
            value: '',
            hidden: false,
            required: false,
            disabled: false,
            focus: false,
            maxlength: 128
        };

        return typeof this.props[key] !== 'undefined' ? this.props[key] : values[key];
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        let className = 'form-input';

        if (this.state.hidden) {
            className += ' form-input--hidden';
        }

        if (this.state.required) {
            className += ' form-input--required';
        }

        if (this.state.disabled) {
            className += ' form-input--disabled';
        }

        return (
            <div className={className}>
                <label className="form-input__label" htmlFor={this.props.id}>{this.props.name}</label>
                <input
                    className="form-input__field"
                    type={this.props.type}
                    name={this.props.id}
                    id={this.props.id}
                    ref={this.props.id}
                    placeholder={this.props.placeholder}
                    autoFocus={this.state.focus}
                    defaultValue={this.state.value}
                    disabled={this.state.disabled}
                    required={this.state.required}
                    maxLength={this.state.maxlength}
                    onChange={this.handleChange.bind(this)} />
            </div>
        );
    }
}

export default FormInput;
