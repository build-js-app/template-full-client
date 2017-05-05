import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class Confirm extends React.Component {
    render() {
        let title = this.props.title ? this.props.title : 'Are you sure?';

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>{title}</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.close}>No</Button>
                        <Button bsStyle="danger" onClick={this.props.action}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

Confirm.propTypes = {
    title: React.PropTypes.string,
    action: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired,
    visible: React.PropTypes.bool
};

export default Confirm;