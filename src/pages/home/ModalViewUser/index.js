import React from "react";
import { FormLabel, Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function ModalEdit(props) {


    return (
        <Modal
            show={true}
            centered
            onHide={() => props.setShowEditUser(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton={true} className={"bg-primary"} />
            <Modal.Body>
                <div className="d-flex flex-row w-100">
                    <div className="d-flex flex-column justify-content-center align-items w-25 h-25">
                        <img className="rounded-circle" src={props.image_user ? props.image_user : "https://www.lojasbrascon.com.br/admin/assets/upload/not-found.png"} classname="img-fluid" alt={props.name} />
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-rigth  col">

                        <FormLabel><b>ID:</b> {props.id_user}</FormLabel>

                        <FormLabel><b>Nome:</b> {props.name}</FormLabel>

                        <FormLabel><b>E-mail:</b> {props.email}</FormLabel>

                        <FormLabel><b>Genre:</b> {props.genre}</FormLabel>

                        <FormLabel><b>Nationality:</b> {props.nationality}</FormLabel>

                        <FormLabel><b>Birth:</b> {props.birth}</FormLabel>

                        <FormLabel><b>Phone:</b> {props.phone}</FormLabel>

                        <FormLabel><b>Street:</b> {props.street_user_address}</FormLabel>

                        <FormLabel><b>Number Home:</b> {props.number_home_user_address}</FormLabel>

                        <FormLabel><b>City:</b> {props.city_user_address}</FormLabel>

                        <FormLabel><b>State:</b> {props.state_user_address}</FormLabel>

                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );


}

export default ModalEdit;