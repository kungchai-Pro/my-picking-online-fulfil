import React,{useState,useEffect} from 'react';

import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { MdOutlineRateReview } from "react-icons/md";
import Exportconfirmorder from './exportconfirmorder';

const ViewTransition = () => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);



    function handleShow(breakpoint) {
        setShow(breakpoint);
    }

    return (
        <div>
            <Button onClick={() => handleShow(true)} variant="success" style={{marginRight:10}}><MdOutlineRateReview /> รายงาน </Button>

            <Modal
                show={show}
                fullscreen={fullscreen}
                onHide={() => setShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                     ข้อมูล Packing order
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Exportconfirmorder />
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default ViewTransition