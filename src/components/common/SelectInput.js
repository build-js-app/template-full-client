import React, {Component} from 'react';
import classnames from 'classnames';
import Select from 'react-select';

class SelectInput extends Component {
    render() {
        let {error, value, name, label, multi, onChange, options} = this.props;

        let wrapperClass = classnames({
            'form-group': true,
            'has-error': error && error.length > 0
        });

        let inputOnChange = (val) => {
            let newValue = val ? val.value : '';

            onChange(name, newValue);
        };

        return (
            <div className={wrapperClass}>
                <label htmlFor={name}>{label}</label>
                <div className="field">
                    <Select
                        name={name}
                        multi={multi}
                        options={options}
                        value={value}
                        onChange={inputOnChange}
                    />
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        );
    }
}

SelectInput.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    options: React.PropTypes.array,
    multi: React.PropTypes.bool,
    error: React.PropTypes.string
};

export default SelectInput;