import React, { Component } from 'react';

class FormButton extends Component {
    render() {
        const wrapperClassName = 'form-button__wrapper';
        let className = [wrapperClassName, wrapperClassName + this.props.id].join(' ');

        return (
            <div className={className}>
                <button className="form-button__button" type={this.props.type} onClick={this.props.onClick}>{this.props.name}</button>
            </div>
        );
    }
}

FormButton.PropTypes = {
    id: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
};

export default FormButton;
