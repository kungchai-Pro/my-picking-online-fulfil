import React, { useEffect, useState, useRef, useCallback } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { FaCheckCircle, FaClipboardCheck, FaCamera, FaBarcode, FaHome } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import Webcam from "react-webcam";
import { urlcall } from '../../config';
import axios from 'axios';
const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user"
};


function Webcamcapture(props) {
    const [lgShow, setLgShow] = useState(false);

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc)              
        },
        [webcamRef]
    );


    const capImagePhoto = () => {
        if (imgSrc !== null) {
            props.capthotoImage(imgSrc);
            setLgShow(false);
            setImgSrc(null)
        }
        else {
            alert('คุณยังไม่ได้ CAPTURE ภาพ')
        }

    }


    return (
        <div>
            <Button variant="warning" style={{ height: 50 }} onClick={() => setLgShow(true)} disabled={props.StatusPick} ><FaCamera /> CAPTURE BOX</Button>

            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >

                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Webcam Capture
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <Webcam
                            audio={false}
                            height={500}
                            width={500}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                    </center>

                    <div>
                        <center>
                            <button onClick={capture}>Capture photo</button>
                            <button onClick={capImagePhoto}>save photo</button>
                        </center>
                    </div>

                    <div>
                        {imgSrc !== null ? <img src={imgSrc} alt="webcam" style={{ width: 200, height: 200 }} /> :
                            <div></div>}
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Webcamcapture