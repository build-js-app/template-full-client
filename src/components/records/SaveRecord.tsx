import React from 'react';
import {Modal, Button, Form} from 'components/bootstrap';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import {useForm} from 'react-hook-form';

import config from 'helpers/configHelper';

import {NumberInputReactHookForm} from 'components/common/NumberInput';
import {TextAreaInputReactHookForm} from 'components/common/TextAreaInput';
import {SelectInputReactHookForm} from 'components/common/SelectInput';

import styled from 'styled-components';

const ErrorMessage = styled.p`
  color: #bf1650;
  ::before {
    display: inline;
    content: '⚠ ';
  }
`;

const dateOptions = {dateFormat: config.format.datePicker};

SaveRecord.propTypes = {
  record: PropTypes.object,
  categories: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  visible: PropTypes.bool
};

function SaveRecord({record, categories, save, close, onChange, visible}) {
  const {register, handleSubmit, errors} = useForm();
  const errorMessage = 'This field is required.';

  function onDateChange(date) {
    onChange('date', new Date(date));
  }

  function render() {
    if (!record) return null;

    let title = record.id ? 'Edit Record' : 'Add New Record';

    let cost = record.cost ? parseFloat(record.cost) : 0;

    let categoryOptions = categories.map(category => {
      return {value: category.id, label: category.title};
    });

    return (
      <Modal show={visible} backdrop="static" onHide={close}>
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(save)}>
            <Form.Group>
              <Form.Label>Date:</Form.Label>
              <div>
                <Flatpickr value={record.date} options={dateOptions} onChange={onDateChange} ref={register} />
              </div>
            </Form.Group>
            {errors.date && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <NumberInputReactHookForm
              name="cost"
              label="Cost"
              defaultValue={cost}
              onChange={onChange}
              register={register}
              required
            />
            {errors.cost && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <SelectInputReactHookForm
              name="categoryId"
              label="Category"
              value={record.categoryId}
              options={categoryOptions}
              onChange={onChange}
              register={register}
              required
            />
            {errors.categoryId && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <TextAreaInputReactHookForm
              name="note"
              label="Note:"
              defaultValue={record.note}
              onChange={onChange}
              placeholder="Note"
              rows="3"
              register={register}
              required
            />
            {errors.note && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Save
              </Button>
              <Button variant="secondary" onClick={close}>
                Cancel
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    );
  }

  return render();
}

export default SaveRecord;
