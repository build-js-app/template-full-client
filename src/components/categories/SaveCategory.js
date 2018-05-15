import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
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
    let category = this.props.category;

    if (!category) return null;

    let title = category.id ? 'Edit Category' : 'Add New Category';

    return (
      <div>
        <Modal show={this.props.visible} onHide={this.props.close}>
          <Modal.Header closeButton onClick={this.props.close}>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextInput
              name="title"
              label="Title"
              value={category.title}
              onChange={this.props.onChange}
              placeholder="Title"
              error={this.state.errors.title}
            />

            <TextAreaInput
              name="description"
              label="Description"
              value={category.description}
              onChange={this.props.onChange}
              placeholder="Description"
              error={this.state.errors.description}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.save}>
              Save
            </Button>
            <Button onClick={this.props.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SaveCategory;