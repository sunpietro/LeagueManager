import React, { Component } from 'react';

import '../../css/components/form-elements/form-textarea.css';

class FormTextarea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.initDefaultValue('value'),
            hidden: this.initDefaultValue('hidden'),
            required: this.initDefaultValue('required'),
            disabled: this.initDefaultValue('disabled'),
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
        };

        return typeof this.props[key] !== 'undefined' ? this.props[key] : values[key];
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        let className = 'form-textarea';

        if (this.state.hidden) {
            className += ' form-textarea--hidden';
        }

        if (this.state.required) {
            className += ' form-textarea--required';
        }

        if (this.state.disabled) {
            className += ' form-textarea--disabled';
        }

        return (
            <div className={className}>
                <label className="form-textarea__label" htmlFor={this.props.id}>{this.props.name}</label>
                <textarea
                    className="form-textarea__field"
                    name={this.props.id}
                    id={this.props.id}
                    ref={this.props.id}
                    placeholder={this.props.placeholder}
                    autoFocus={this.state.focus}
                    defaultValue={this.state.value}
                    disabled={this.state.disabled}
                    required={this.state.required}
                    onChange={this.handleChange.bind(this)}>
                </textarea>
            </div>
        );
    }
}

FormTextarea.PropTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    focus: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    options: React.PropTypes.array,
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
};

export default FormTextarea;
