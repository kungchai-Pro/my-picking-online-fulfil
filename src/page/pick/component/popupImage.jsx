import React,{useEffect,useState} from 'react'
import Modal from 'react-bootstrap/Modal';

function PopupImage({imagesID}) {
    const [lgShow, setLgShow] = useState(false);
  return (
    <div>

    <div onClick={() => setLgShow(true)}>
        <a href='#'><img src={imagesID} width="210" height="190" /></a>
    </div>
    <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
    >
        <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                แสดงรูปสินค้า
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <center>
                <div style={{ width: '100%', height: 500 }}>
                    <img src={imagesID} style={{ width: '100%', height:'100%' }} />
                </div>
            </center>
        </Modal.Body>
    </Modal>
</div>
  )
}

export default PopupImage