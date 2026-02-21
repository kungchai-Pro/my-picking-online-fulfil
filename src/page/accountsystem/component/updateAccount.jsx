import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'

import { UpdateNewUser, Departmentlist, Positionlist, AccountById } from '../service-all';

function UpdateUser({ AcId }) {

  const [departList, setDepartList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [Userlist, setUserlist] = useState([])

  const [userregister, setUserregister] = useState({
    acId: AcId,
    username: "", password: "", name: "", employeeId: "",
    departmentId: "", positioncode: "", email: "", roles: "", isActive: "", menugroupId: ""
  })


  useEffect(() => {
    DepartDataList();
    PositionDataList();
    getUserById();
  }, [])

  const getUserById = () => {

    AccountById(AcId).then((res) => {
      if (res.status == 200) {
        // console.log(res.data[0])
        setUserregister(res.data[0])
      }
    })

  }

  const DepartDataList = () => {
    Departmentlist().then((res) => {
      if (res) {

        setDepartList(res.data)
      }
    })
  }

  const PositionDataList = () => {
    Positionlist().then((res) => {
      if (res) {
        setPositionList(res.data)
      }
    })
  }


  const UpdateNewUsers = (e) => {
    e.preventDefault();

    if (userregister.username == "" ||
      userregister.employeeId == "" || userregister.departmentId == "" ||
      userregister.positioncode == "" || userregister.email == "" ||
      userregister.roles == "" || userregister.isActive == "") {
      // alert('กรุณา ป้อนข้อมูลให้ถูกต้อง')
      Swal.fire({
        title: "แจ้งเตือน?",
        text: "กรุณา ป้อนข้อมูลให้ถูกต้อง ?",
        icon: "question"
      });
    } else {

      Swal.fire({
        title: "แจ้งเตือน",
        text: "คุณแน่ใจที่จะทำการแก้ไขใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "แก้ไขข้อมูล",
        cancelButtonText:'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          UpdateNewUser(userregister).then((res) => {
            console.log(res);
            if (res.data.status == 200) {
              // alert(res.data.message)
              Swal.fire({
                title: "เรียบร้อยแล้ว!",
                text: "คุณได้ทำการแก้ไขข้อมูลเรียบแล้ว.",
                icon: "success"
              });
              
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
            else {
              alert('เกิดข้อผิดพลาดในการแก้ไขข้อมูล')
            }
          })


        }

      });

      // UpdateNewUser(userregister).then((res) => {
      //   console.log(res);
      //   if (res.data.status == 200) {
      //     // alert(res.data.message)
      //     alert("คุณแก้ไข ผู้ใช้งานเรียบร้อยแล้ว")
      //   }
      //   else {
      //     alert('เกิดข้อผิดพลาดในการแก้ไขข้อมูล')
      //   }

      // })

    }

  }


  const handle_isActive = (e) => {

    var ischeck = e.target.value;

    if (e.target.checked) {
      setUserregister({ ...userregister, isActive: ischeck })
    }
    else {
      setUserregister({ ...userregister, isActive: '0' })
    }
  }

  return (
    <Container>
      <Form onSubmit={UpdateNewUsers}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUserName">
            <Form.Label>UserName(ชื่อผู้เข้าใช้งาน)</Form.Label>
            <Form.Control type="text" placeholder="user name" value={userregister.username}
              onChange={(e) => setUserregister({ ...userregister, username: e.target.value })} required disabled />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name (ชื่อผู้ใช้งาน)</Form.Label>
            <Form.Control type="text" placeholder="Name" value={userregister.name} required
              onChange={(e) => setUserregister({ ...userregister, name: e.target.value })} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridemployeeId">
            <Form.Label>Employee Code (รหัสพนักงาน)</Form.Label>
            <Form.Control type="text" placeholder="employee code" value={userregister.employeeId}
              onChange={(e) => setUserregister({ ...userregister, employeeId: e.target.value })} required />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDepartment">
            <Form.Label>Department (แผนก)</Form.Label>
            <Form.Select
              onChange={(e) => setUserregister({ ...userregister, departmentId: e.target.value })} required>
              {/* <option value={""}>เลือกแผนก</option> */}
              {departList.map((item, i) => (
                userregister.departmentId == item.codeId ?
                  <option value={item.codeId} selected="selected">{item.Name}</option> :
                  <option value={item.codeId}>{item.Name}</option>
              ))}

            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPosition" >
            <Form.Label>Position ( ตำแหน่งงาน )</Form.Label>
            <Form.Select
              onChange={(e) => setUserregister({ ...userregister, positioncode: e.target.value })} required>
              {/* <option value={""}>เลือกตำแหน่งงาน</option> */}
              {positionList.map((item, i) => (
                userregister.positioncode == item.CodeId ?
                  <option value={item.CodeId} selected="selected">{item.NamePosition}</option> :
                  <option value={item.CodeId}>{item.NamePosition}</option>
              ))}

            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Email (อีเมล์)</Form.Label>
            <Form.Control type="text" placeholder="Apartment, studio, or floor" value={userregister.email}
              onChange={(e) => setUserregister({ ...userregister, email: e.target.value })} />
          </Form.Group>
        </Row>

        <Form.Group as={Col} controlId="formGridState" style={{ width: '50%' }} required>
          <Form.Label>Role ( กำหนดสิทธิ์ )</Form.Label>
          <Form.Select defaultValue={userregister.roles == 'user' ? 'ผู้ใช้งานทั่วไป' : 'ผู้ดูแลระบบ'}
            onChange={(e) => setUserregister({ ...userregister, roles: e.target.value })}>
             {userregister.roles=='user'?<option value={'user'} selected='selected'> user (ผู้ใช้งานทั่วไป)</option>:
             <option value={'user'}> user (ผู้ใช้งานทั่วไป)</option>}
            {userregister.roles=='admin'?<option value={'admin'} selected='selected'> admin (ผู้ดูแลระบบ)</option>:
            <option value={'admin'}> admin (ผู้ดูแลระบบ)</option>}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" id="formGridCheckbox" style={{ marginTop: 10 }} >

          {userregister.isActive == "1" ?
            <Form.Check type="checkbox" label="เปิดใช้งาน"
              value={"1"} onClick={(e) => handle_isActive(e)} defaultChecked={true} /> :
            <Form.Check type="checkbox" label="เปิดใช้งาน"
              value={"1"} onClick={(e) => handle_isActive(e)} />
          }

        </Form.Group>


        <center>
          <Button variant="primary" type="submit" style={{ marginRight: 10 }}>
            บันทึก
          </Button>
          <Button variant="warning" type="reset">
            ยกเลิก
          </Button>
        </center>
      </Form>
    </Container>
  )
}


function UpdateAccount({ AcId }) {
  const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <div style={{ marginRight: 5 }}>
      <Button size='sm' variant="warning" onClick={() => handleShow(true)} >อัพเดท</Button>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateUser AcId={AcId} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UpdateAccount