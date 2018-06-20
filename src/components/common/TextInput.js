import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Label} from 'components/bootstrap';

class TextInput extends React.Component {
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

    let inputOnChange = event => {
      this.props.onChange(event.target.name, event.target.value);
    };

    return (
      <div className={wrapperClass}>
        <Label htmlFor={name}>{label}</Label>

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
