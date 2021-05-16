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
  type?: string;
  disabled?: boolean;
}

function TextInput({name, label, onChange, placeholder, value, error, type, disabled}: Props) {
  let wrapperClass = classnames({
    'form-group': true,
    'has-error': error && error.length > 0
  });

  let inputType = type ? type : 'text';

  function inputOnChange(event) {
    onChange(event.target.name, event.target.value);
  }

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

export default TextInput;
