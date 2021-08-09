import React, { useState } from "react";
import { Modal, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalProcess(props) {
    const [show, setShow] = useState(true);

    const [isError] = useState(props.error);

    if (show) {
        return (
            <Modal
                show={show}
                centered
                onHide={isError ? () => setShow(false) : null}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header 
                    closeButton={isError ? true : false}
                    className={isError ? "bg-danger" : "bg-success"}
                >
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {isError ? null : <Spinner animation="border" variant="dark" />}
                        <small className="m-3 text-white">
                            {props.title}
                        </small>
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        );
    }
    return null;
}

export default ModalProcess;