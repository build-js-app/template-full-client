import React, {Component} from 'react';
import {FormGroup, Label, CustomInput} from 'components/bootstrap';
import PropTypes from 'prop-types';

class SelectInput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array,
    error: PropTypes.string
  };

  render() {
    let {error, value, name, label, onChange, options} = this.props;

    let inputOnChange = event => {
      onChange(name, event.target.value);
    };

    return (
      <FormGroup>
        <Label>{label}</Label>

        <CustomInput type="select" id={name} name={name} value={value} onChange={inputOnChange}>
          {!value && <option value="select">Select Category</option>}

          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </CustomInput>

        {error && <div className="alert alert-danger">{error}</div>}
      </FormGroup>
    );
  }
}

export default SelectInput;
