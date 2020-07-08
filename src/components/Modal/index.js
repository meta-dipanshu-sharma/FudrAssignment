import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './style.scss'

class index extends Component {

    render() {
        const {
            animation,
            confirmationText,
            handleCancel,
            handleConfirm,
            modalBody,
            onHide,
            show,
            size,
            title
        } = this.props

        return (
            <Modal
                animation={animation}
                onHide={onHide}
                show={show}
                size={size}
            >
                <Modal.Header>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {modalBody}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        className="cancelBtn"
                        onClick={handleCancel}
                        variant="light"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        variant="primary"
                    >
                        {confirmationText}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

index.propTypes = {
    animation: PropTypes.bool.isRequired,
    confirmationText: PropTypes.string.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    modalBody: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default index