import React, { Component } from 'react';

class FormButton extends Component {
    render() {
        const wrapperClassName = 'form-button__wrapper';
        let className = [wrapperClassName, wrapperClassName + this.props.id].join(' ');

        return (
            <div className={className}>
                <button className="form-button__button" type={this.props.type} onClick={this.props.onclick}>{this.props.name}</button>
            </div>
        );
    }
}

export default FormButton;
