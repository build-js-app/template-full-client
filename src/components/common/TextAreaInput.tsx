import React from 'react';
import classnames from 'classnames';
import {Form} from 'components/bootstrap';

interface Props {
  name: string;
  label: string;
  onChange: OnChangeHandler;
  placeholder?: string;
  value?: string;
  error?: string;
  rows?: number;
}

function TextAreaInput({name, label, onChange, placeholder, value, error, rows}: Props) {
  let wrapperClass = classnames({
    'form-group': true,
    'has-error': error && error.length > 0
  });

  function inputOnChange(event) {
    onChange(event.target.name, event.target.value);
  }

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
