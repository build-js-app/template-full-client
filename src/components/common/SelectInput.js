import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';

class SelectInput extends Component {
  render() {
    let {error, value, name, label, onChange, options} = this.props;

    let inputOnChange = event => {
      onChange(name, event.target.value);
    };

    return (
      <div>
        <FormGroup controlId={name}>
          <ControlLabel>{label}</ControlLabel>

          <FormControl componentClass="select" onChange={inputOnChange} value={value}>
            {!value && <option value="select">Select Category</option>}

            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FormControl>
        </FormGroup>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  error: PropTypes.string
};

export default SelectInput;
