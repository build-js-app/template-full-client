import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';

import NumberInput from '../common/NumbertInput';
import TextAreaInput from '../common/TextAreaInput';
import SelectInput from '../common/SelectInput';

let config = require('../../config/config.json');

class SaveRecord extends Component {
    static propTypes = {
        record: PropTypes.object,
        categories: PropTypes.array.isRequired,
        save: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        visible: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            dateOptions: {
                dateFormat: config.format.datePicker
            },
            errors: {}
        };

        autoBind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            errors: {}
        });
    }

    formIsValid() {
        let errors = {};
        let record = this.props.record;

        if (!record.categoryId) {
            errors.categoryId = 'Category field is required.';
        }

        if (!record.cost) {
            errors.cost = 'Cost field is required.';
        }

        if (!record.note) {
            errors.note = 'Note field is required.';
        }

        this.setState({errors: errors});

        return Object.keys(errors).length === 0;
    }

    save() {
        if (!this.formIsValid()) return;

        this.props.save();
    }

    onDateChange(date) {
        this.props.onChange('date', new Date(date));
    }

    render() {
        let record = this.props.record;

        if (!record) return null;

        record.cost = record.cost ? parseFloat(record.cost) : 0;

        let title = record.id ? 'Edit Record' : 'Add New Record';

        let categoryOptions = this.props.categories.map((category) => {
            return {value: category.id, label: category.title};
        });

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Date:</label>

                            <div className="field">
                                <Flatpickr value={record.date}
                                           options={this.state.dateOptions}
                                           onChange={this.onDateChange}
                                />
                            </div>
                        </div>

                        <NumberInput name="cost"
                                     label="Cost"
                                     value={record.cost}
                                     onChange={this.props.onChange}
                                     error={this.state.errors.cost}
                        />

                        <SelectInput
                            name="categoryId"
                            label="Category"
                            value={record.categoryId}
                            options={categoryOptions}
                            onChange={this.props.onChange}
                            error={this.state.errors.categoryId}
                        />

                        <TextAreaInput name="note"
                                       label="Note:"
                                       value={record.note}
                                       onChange={this.props.onChange}
                                       placeholder="Note"
                                       error={this.state.errors.note}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.save}>Save</Button>
                        <Button onClick={this.props.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default SaveRecord;