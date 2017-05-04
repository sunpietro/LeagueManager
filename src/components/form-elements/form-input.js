import React, { Component } from 'react';

class FormInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.initDefaultValue('value'),
            hidden: this.initDefaultValue('hidden'),
            required: this.initDefaultValue('required'),
            disabled: this.initDefaultValue('disabled'),
            maxLength: this.initDefaultValue('maxLength'),
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
            maxLength: 128
        };

        return typeof this.props[key] !== 'undefined' ? this.props[key] : values[key];
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        let className = 'form-input form__field pure-control-group';

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
                <label className="form-input__label form__field-label" htmlFor={this.props.id}>{this.props.name}</label>
                <input
                    className="form-input__field form__field-input"
                    type={this.props.type}
                    name={this.props.id}
                    id={this.props.id}
                    ref={this.props.id}
                    placeholder={this.props.placeholder}
                    autoFocus={this.state.focus}
                    defaultValue={this.state.value}
                    disabled={this.state.disabled}
                    required={this.state.required}
                    maxLength={this.state.maxLength}
                    onChange={this.handleChange.bind(this)} />
            </div>
        );
    }
}

FormInput.PropTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    focus: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    options: React.PropTypes.array,
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    maxLength: React.PropTypes.number,
    placeholder: React.PropTypes.string,
};

export default FormInput;
