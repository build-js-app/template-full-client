import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Confirm extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    action: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    visible: PropTypes.bool
  };

  render() {
    let title = this.props.title ? this.props.title : 'Confirmation';
    let message = this.props.message ? this.props.message : 'Are you sure?';

    return (
      <div>
        <Modal show={this.props.visible} onHide={this.props.close}>
          <Modal.Header closeButton onClick={this.props.close}>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{message}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.close}>No</Button>
            <Button bsStyle="danger" onClick={this.props.action}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Confirm;
