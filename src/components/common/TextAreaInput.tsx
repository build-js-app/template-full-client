import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Form} from 'bootstrap';

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.number
};

function TextAreaInput({name, label, onChange, placeholder, value, error, rows}) {
  let wrapperClass = classnames({
    'form-group': true,
    'has-error': error && error.length > 0
  });

  let inputOnChange = event => {
    onChange(event.target.name, event.target.value);
  };

  if (!rows) rows = 3;

  return (
    <div className={wrapperClass}>
      <Form.Label htmlFor={name}>{label}</Form.Label>

      <textarea
        name={name}
        rows={rows}
        className="form-control"
        placeholder={placeholder}
        value={value ? value : ''}
        onChange={inputOnChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default TextAreaInput;
