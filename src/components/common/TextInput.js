import React from 'react';
import classnames from 'classnames';

class TextInput extends React.Component {
    render() {
        let {error, value, name, label, placeholder, type, disabled} = this.props;

        let wrapperClass = classnames({
            'form-group': true,
            'has-error': error && error.length > 0
        });

        let inputType = type ? type : 'text';

        let inputOnChange = (event) => {
            this.props.onChange(event.target.name, event.target.value);
        };

        return (
            <div className={wrapperClass}>
                <label htmlFor={name}>{label}</label>
                <div className="field">
                    <input
                        type={inputType}
                        name={name}
                        className="form-control"
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value ? value : ''}
                        onChange={inputOnChange}/>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        );
    }
}

TextInput.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string,
    type: React.PropTypes.string,
    disabled: React.PropTypes.bool
};

export default TextInput;