import React from 'react';
import {Form} from 'bootstrap';
import PropTypes from 'prop-types';

function SelectInput({name, label, value, onChange, options, error}) {
  let inputOnChange = event => {
    onChange(name, event.target.value);
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>

      <Form.Control as="select" id={name} name={name} value={value} onChange={inputOnChange}>
        {!value && <option value="select">Select Category</option>}

        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Control>

      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  error: PropTypes.string
};

export default SelectInput;
