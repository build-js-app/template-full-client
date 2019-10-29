import React, {Component} from 'react';
import {Modal, Button, Form} from '../bootstrap';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';

import helper from '../../helpers/reactHelper';
import config from '../../helpers/configHelper';

import NumberInput from '../common/NumberInput';
import TextAreaInput from '../common/TextAreaInput';
import SelectInput from '../common/SelectInput';

class SaveRecord extends Component<any, any> {
  static propTypes = {
    record: PropTypes.object,
    categories: PropTypes.array.isRequired,
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    visible: PropTypes.bool
  };

  state = {
    dateOptions: {
      dateFormat: config.format.datePicker
    },
    errors: {
      categoryId: '',
      cost: '',
      note: ''
    }
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      errors: {}
    });
  }

  formIsValid() {
    let errors: any = {};
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
    const {record, categories, visible, close} = this.props;
    const {errors, dateOptions} = this.state;

    if (!record) return null;

    record.cost = record.cost ? parseFloat(record.cost) : 0;

    let title = record.id ? 'Edit Record' : 'Add New Record';

    let categoryOptions = categories.map(category => {
      return {value: category.id, label: category.title};
    });

    return (
      <div>
        <Modal show={visible} backdrop="static" onHide={close}>
          <Modal.Header closeButton>{title}</Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Date:</Form.Label>

              <div>
                <Flatpickr value={record.date} options={dateOptions} onChange={this.onDateChange} />
              </div>
            </Form.Group>

            <NumberInput
              name="cost"
              label="Cost"
              value={record.cost}
              onChange={this.props.onChange}
              error={errors.cost}
            />

            <SelectInput
              name="categoryId"
              label="Category"
              value={record.categoryId}
              options={categoryOptions}
              onChange={this.props.onChange}
              error={errors.categoryId}
            />

            <TextAreaInput
              name="note"
              label="Note:"
              value={record.note}
              onChange={this.props.onChange}
              placeholder="Note"
              error={errors.note}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.save}>
              Save
            </Button>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SaveRecord;
