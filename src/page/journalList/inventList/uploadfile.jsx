
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaFileUpload } from "react-icons/fa";
import { UploadFiles, UpdateInventImageById } from '../service-all';

function Uploadfile(props) {
  const [lgShow, setLgShow] = useState(false);
  const [fileLoad, setFileLoad] = useState("")

  // const [file, setFile] = useState([]);

  const handleFile = event => {
    var input = document.getElementById('loadfile');
    const file = input.files[0]
    const size = file.size // it's in bytes

    setFileLoad(input.files[0])

  };

  const UploadfileImage = async (e) => {
    e.preventDefault();

    if (fileLoad !== "") {
      if (fileLoad.size / 1024 > 500) {
        alert("file size must not be greater than to 500k")
      } else {
        // const base64 = await convertBase64(fileLoad);

        //  uploade  on change name  
        UploadFiles(fileLoad).then((res) => {
          if (res) {
            console.log(res)
            var object = {
              Id: props.Id,
              namefile: res.filename
            }
            // update to table inventory 
            UpdateInventImageById(object).then((res) => {
              if (res) {
                // console.log(res)
                props.loadDataInvent();
                setLgShow(false)
              }
            }).catch(err=>{console.log(err)})

          }
        })

      }

    }
    else {
      alert('คุณยังไม่ได้เลือกไฟล์ ')
    }

  }

  // convert file to base64
  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };


  return (
    <div>
      <Button onClick={() => setLgShow(true)} size='sm' variant="primary" ><FaFileUpload /> Upload file</Button>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"

      >
        <Modal.Header closeButton style={{ backgroundColor: '#0C81F5' }}>
          <Modal.Title id="example-modal-sizes-title-lg" style={{ color: '#ffff' }}>
            UPLOAD FILE INVENT
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#F2F3F2' }}>
          <Form onSubmit={(e) => UploadfileImage(e)} encType='multipart/form-data'>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>กรุณาเลือกรูปที่ต้องการ Up Load  ( ITEM ID : {props.ItemId})</Form.Label>
              <Form.Control type="file" accept="image/png, image/jpg" onChange={handleFile} id='loadfile' />
            </Form.Group>
            <Button type='submit' variant="warning">Upload</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Uploadfile