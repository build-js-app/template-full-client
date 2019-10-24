import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Form} from '../bootstrap';

class TextInput extends Component<any, any> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool
  };

  render() {
    let {error, value, name, label, placeholder, type, disabled} = this.props;

    let wrapperClass = classnames({
      'form-group': true,
      'has-error': error && error.length > 0
    });

    let inputType = type ? type : 'text';

    let inputOnChange = (event: any) => {
      this.props.onChange(event.target.name, event.target.value);
    };

    return (
      <div className={wrapperClass}>
        <Form.Label htmlFor={name}>{label}</Form.Label>

        <input
          type={inputType}
          name={name}
          className="form-control"
          placeholder={placeholder}
          disabled={disabled}
          value={value ? value : ''}
          onChange={inputOnChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default TextInput;
