import React, {Component} from 'react';
import {Modal, Button} from 'components/bootstrap';
import PropTypes from 'prop-types';

import helper from 'helpers/reactHelper';

import TextInput from 'components/common/TextInput';
import TextAreaInput from 'components/common/TextAreaInput';

class SaveCategory extends Component {
  static propTypes = {
    category: PropTypes.object,
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    visible: PropTypes.bool
  };

  state = {
    errors: {}
  };

  constructor(props) {
    super(props);

    helper.autoBind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      errors: {}
    });
  }

  formIsValid() {
    let errors = {};
    let category = this.props.category;

    if (!category.title) {
      errors.title = 'Title field is required.';
    }

    if (!category.description) {
      errors.description = 'Description field is required.';
    }

    this.setState({errors: errors});

    return Object.keys(errors).length === 0;
  }

  save() {
    if (!this.formIsValid()) return;

    this.props.save();
  }

  render() {
    const {category, visible, close, onChange} = this.props;
    const {errors} = this.state;

    if (!category) return null;

    let title = category.id ? 'Edit Category' : 'Add New Category';

    return (
      <div>
        <Modal show={visible} backdrop="static" onHide={close}>
          <Modal.Header closeButton>{title}</Modal.Header>
          <Modal.Body>
            <TextInput
              name="title"
              label="Title"
              value={category.title}
              onChange={onChange}
              placeholder="Title"
              error={errors.title}
            />

            <TextAreaInput
              name="description"
              label="Description"
              value={category.description}
              onChange={onChange}
              placeholder="Description"
              error={errors.description}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.save}>
              Save
            </Button>
            <Button variant="secondary" onClick={close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SaveCategory;
