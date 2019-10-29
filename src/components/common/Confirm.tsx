import React from 'react';
import {Modal, Button} from '../bootstrap';
import PropTypes from 'prop-types';

function Confirm({title, text, visible, action, close}) {
  let displayTitle = title ? title : 'Confirmation';
  let displayMessage = text ? text : 'Are you sure?';

  return (
    <Modal show={visible} backdrop="static" onHide={close}>
      <Modal.Header closeButton>{displayTitle}</Modal.Header>
      <Modal.Body>
        <h4>{displayMessage}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          No
        </Button>
        <Button variant="danger" onClick={action}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

Confirm.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  visible: PropTypes.bool,
  action: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default Confirm;
