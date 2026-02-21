import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { CreateNewUser, Departmentlist, Positionlist, AccountList } from './service-all';
import TableAccount from './component/tableAccount';

function CreateUserPage() {

  const [departList, setDepartList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [Userlist, setUserlist] = useState([])

  const [userregister, setUserregister] = useState({
    username: "", password: "", name: "", employeeId: "",
    departmentId: "", positioncode: "", email: "", roles: "", isActive: "", menugroupId: ""
  })

  useEffect(() => {
    DepartDataList();
    PositionDataList();
    AccountAll();

  }, [])


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

  const AccountAll = () => {
    AccountList().then((res) => {

      if (res.status == 200) {

        setUserlist(res.data)
      }
    })
  }

  const addNewUser = (e) => {
    e.preventDefault();
   
    if (userregister.username == "" || userregister.password == "" ||
      userregister.employeeId == "" || userregister.departmentId == "" ||
      userregister.positioncode == "" || userregister.email == "" ||
      userregister.roles == "" || userregister.isActive == "") {
        Swal.fire({
          title: "แจ้งเตือน",
          text: "กรุณาป้อนข้อมูลให้ถูกต้อง ?",
          icon: "question"
        });

    } else {

      Swal.fire({
        title: "แจ้งเตือน ?",
        text: "คุณต้องการบันทึกข้อมูลใช้หรือไม่!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "บันทึก",
        cancelButtonText:'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {

          CreateNewUser(userregister).then((res) => {

            if (res.data.status == 400) {
              Swal.fire({
                title: "แจ้งเตือน",
                text: "UserName นี้มีผู้ใช้งานอยู่แล้ว ?",
                icon: "question"
              });

              // alert("UserName นี้มีผู้ใช้งานอยู่แล้ว")

            }
            else {
              Swal.fire({
                title: "แจ้งเตือน !",
                text: "คุณได้บันทึกข้อมูลเรียเสร็จแล้ว",
                icon: "success"
              });
              AccountAll()
            }
          });

        }

      })

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
    <div>
      <div style={{marginBottom:20 ,backgroundColor:'#F6F2F1',padding:20}}>
       <center> <b>หน้าสร้างผู้ใช้งานระบบ</b></center>
      </div>
      <Container>
        <Form onSubmit={addNewUser}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridUserName">
              <Form.Label>UserName(ชื่อผู้เข้าใช้งาน)</Form.Label>
              <Form.Control type="text" placeholder="user name"
                onChange={(e) => setUserregister({ ...userregister, username: e.target.value })} required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password (รหัสผู้ใช้งาน)</Form.Label>
              <Form.Control type="password" placeholder="Password"
                onChange={(e) => setUserregister({ ...userregister, password: e.target.value })} required />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name (ชื่อผู้ใช้งาน)</Form.Label>
              <Form.Control type="text" placeholder="Name" required
                onChange={(e) => setUserregister({ ...userregister, name: e.target.value })} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridemployeeId">
              <Form.Label>Employee Code (รหัสพนักงาน)</Form.Label>
              <Form.Control type="text" placeholder="employee code"
                onChange={(e) => setUserregister({ ...userregister, employeeId: e.target.value })} required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDepartment">
              <Form.Label>Department (แผนก)</Form.Label>
              <Form.Select
                onChange={(e) => setUserregister({ ...userregister, departmentId: e.target.value })} required>
                <option value={""} selected>เลือกแผนก</option>
                {departList.map((item, i) => (
                  <option value={item.codeId}>{item.Name}</option>
                ))}

              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPosition" >
              <Form.Label>Position ( ตำแหน่งงาน )</Form.Label>
              <Form.Select defaultValue="เลือกตำแหน่ง"
                onChange={(e) => setUserregister({ ...userregister, positioncode: e.target.value })} required>
                <option value={""}>เลือกตำแหน่งงาน</option>
                {positionList.map((item, i) => (
                  <option value={item.CodeId}>{item.NamePosition}</option>
                ))}

              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress2">
              <Form.Label>Email (อีเมล์)</Form.Label>
              <Form.Control type="text" placeholder="Apartment, studio, or floor"
                onChange={(e) => setUserregister({ ...userregister, email: e.target.value })} />
            </Form.Group>
          </Row>

          <Form.Group as={Col} controlId="formGridRoles" style={{ width: '50%' }} required>
            <Form.Label>Role ( กำหนดสิทธิ์ )</Form.Label>
            <Form.Select
              onChange={(e) => setUserregister({ ...userregister, roles: e.target.value })} >
              <option value={''} selected>เลือกกำหนดสิทธิ์</option>
              <option value={'user'} >ผู้ใช้งานทั่วไป</option>
              <option value={'admin'} >ผู้ดูแลระบบ</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" id="formGridCheckbox" style={{ marginTop: 10 }} >
            <Form.Check type="checkbox" label="เปิดใช้งาน"
              value={"1"} onClick={(e) => handle_isActive(e)} />
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
      <hr></hr>

      <div>
        <Container><TableAccount data={Userlist} /></Container>
      </div>
    </div>
  )
}

export default CreateUserPage