import React from 'react';
import classnames from 'classnames';
import {Form} from 'components/bootstrap';

interface Props {
  name: string;
  label: string;
  onChange: OnChangeHandler;
  value?: number;
  error?: string;
}

function NumberInput({name, label, onChange, value, error}: Props) {
  let wrapperClass = classnames({
    'form-group': true,
    'has-error': error && error.length > 0
  });

  function inputOnChange(event) {
    onChange(event.target.name, event.target.value);
  }

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

export default NumberInput;
