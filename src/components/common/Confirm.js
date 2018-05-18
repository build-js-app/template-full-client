import React, {Component} from 'react';
import {Modal, Button} from 'components/bootstrap';
import PropTypes from 'prop-types';

class Confirm extends Component {
  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    action: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  };

  render() {
    const {title, message, visible, action, close} = this.props;

    let displayTitle = title ? title : 'Confirmation';
    let displayMessage = message ? message : 'Are you sure?';

    return (
      <div>
        <Modal isOpen={visible} backdrop="static" toggle={close}>
          <Modal.Header toggle={close}>{displayTitle}</Modal.Header>
          <Modal.Body>
            <h4>{displayMessage}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>No</Button>
            <Button color="danger" onClick={action}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Confirm;
