import React from 'react';
import {Modal, Button} from 'components/bootstrap';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';

import {TextInputReactHookForm} from 'components/common/TextInput';
import {TextAreaInputReactHookForm} from 'components/common/TextAreaInput';

import styled from 'styled-components';

const ErrorMessage = styled.p`
  color: #bf1650;
  ::before {
    display: inline;
    content: '⚠ ';
  }
`;

SaveCategory.propTypes = {
  category: PropTypes.object,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  visible: PropTypes.bool
};

function SaveCategory({category, save, close, onChange, visible}) {
  const {register, handleSubmit, errors} = useForm();
  const errorMessage = 'This field is required.';

  function render() {
    if (!category) return null;

    let title = category.id ? 'Edit Category' : 'Add New Category';

    return (
      <Modal show={visible} backdrop="static" onHide={close}>
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(save)}>
            <TextInputReactHookForm
              name="title"
              label="Title"
              type="text"
              defaultValue={category.title}
              onChange={onChange}
              placeholder="Title"
              register={register}
              required
            />
            {errors.title && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <TextAreaInputReactHookForm
              name="description"
              label="Description"
              placeholder="Description"
              defaultValue={category.description}
              onChange={onChange}
              rows="3"
              register={register}
              required
            />
            {errors.description && <ErrorMessage>{errorMessage}</ErrorMessage>}
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

export default SaveCategory;
