import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Form} from '../bootstrap';

class NumberInput extends Component<any, any> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.number,
    error: PropTypes.string
  };

  render() {
    let {error, value, name, label} = this.props;

    let wrapperClass = classnames({
      'form-group': true,
      'has-error': error && error.length > 0
    });

    let inputOnChange = (event: any) => {
      this.props.onChange(event.target.name, event.target.value);
    };

    return (
      <div className={wrapperClass}>
        <Form.Label htmlFor={name}>{label}</Form.Label>

        <input
          type="number"
          name={name}
          className="form-control"
          min="0"
          step="1"
          value={value ? value : 0.0}
          onChange={inputOnChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default NumberInput;
