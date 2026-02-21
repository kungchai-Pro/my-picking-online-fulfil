import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import { Update_ChangePassword, AccountById } from '../service-all'

function MyVerticallyCenteredModal(props) {
  const [putvalues, setPutvalues] = useState({ Id: "", username: "", password: "" })


  const onChangePassword = () => {
    if (putvalues.password == "") {
      Swal.fire({
        title: "แจ้งเตือน?",
        text: "คุณยังไม่ได้ป้อนข้อมูล หรัสที่ต้องการ?",
        icon: "question"
      });
    } else {
      Swal.fire({
        title: "แจ้งเตือน ?",
        text: "คุณแน่ใจหรือไม่ที่จะเปลี่ยนรหัส!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "บันทึกแก้ไข",
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {

          Update_ChangePassword(putvalues).then((res) => {
            if (res.status == 200) {
              Swal.fire({
                title: "เรียบร้อยแล้ว!",
                text: "คุณได้ทำการบันทึกการเปลี่ยนรหัสแล้ว.",
                icon: "success"
              });
              setPutvalues({ ...putvalues, password: "" })

              setTimeout(() => {
                HidePopup()
              }, 1000);
            } else {
              console.log('error update change password ')
            }

          })
        }

      });
    }
  }

  const HidePopup = () => {
    props.onHide()
  }


  useEffect(() => {
    getUserByid(props.AcId);
  }, [])

  const getUserByid = (Id) => {

    AccountById(Id).then((res) => {
      var useranmes = res.data[0].username;
      setPutvalues({ ...putvalues, username: useranmes, Id: Id })
    })

  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ flexDirection: 'column' }}>
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="user name" name='username' value={putvalues.username} disabled />
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="password new change" name='password'
            onChange={(e) => setPutvalues({ ...putvalues, password: e.target.value })} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onChangePassword}>บันทึก</Button>
        <Button onClick={props.onHide}>ยกเลิก</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Repassword({ AcId }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div style={{ marginRight: 5 }}>

      <Button size='sm' variant="primary" onClick={() => setModalShow(true)}>เปลี่ยนรหัส</Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        AcId={AcId}
      />
    </div>
  )
}

export default Repassword