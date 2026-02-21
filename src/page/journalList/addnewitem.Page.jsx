import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { IoIosAddCircle } from "react-icons/io";
import Modal from 'react-bootstrap/Modal';

const AddnewitemPage = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setShow(true);
    }

  return (
    <div>
        <Button size='sm'  variant="success" onClick={() => handleShow(true)}><IoIosAddCircle size={20}/></Button>

        <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Item List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <VeiwdailHeader saleorderId={saleorderId} /> */}
                </Modal.Body>
            </Modal>
    </div>
  )
}

export default AddnewitemPage