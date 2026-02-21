import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { loginUser } from './service-all';
import Swal from 'sweetalert2'

const logo = require('../../images/logo.png');
const smart_protect1 = require('../../images/smart-protect-1.jpg')
const smart_protect2 = require('../../images/smart-protect-2.jpg')
const smart_protect3 = require('../../images/smart-protect-3.jpg')


const Homepage = () => {

  const [loginU, setLoginU] = useState({ username: "", password: "" })

  useEffect(() => {
    sessionStorage.clear()
  })


  function loginsystem(e) {
    e.preventDefault();
    if (loginU.username == "" || loginU.password == "") {
      Swal.fire({
        title: "แจ้งเตือน !",
        text: "กรุณา ป้อนข้อมูลให้ถูกต้อง ?",
        icon: "warning"
      });
    } else {
      loginUser(loginU).then((res) => {
        if (res) {
          var result = res.data[0];

          if (result.isActive == 1) {
            sessionStorage.setItem("username", result.username);
            sessionStorage.setItem("positioncode", result.positioncode);
            sessionStorage.setItem("roles", result.roles)
            sessionStorage.setItem("activeremove", result.activeremove)

            Swal.fire({
              title: "ยินดีต้อนรับ !",
              text: "คุณได้ทำการ Login pick online เรียร้อแล้ว",
              icon: "success"
            });
            if (result.roles == 'admin') {

              setTimeout(() => {
                window.location.href = '/systemlist'
              }, 1500);

            } else {

              setTimeout(() => {
                window.location.href = '/systemlist'
              }, 1500);

            }

          } else {

            Swal.fire({
              title: "แจ้งเตือน !",
              text: "เกิดข้อผิดพลาด User Name นี้ยังไม่ได้เปิดใช้งานกรุณาแจ้งผู้่ดูแลระลล?",
              icon: "warning"
            });

          }

        }
        else {
          Swal.fire({
            title: "แจ้งเตือน !",
            text: "เกิดข้อผิดพลาด กรุณาตรวจสอบ username or passowrd?",
            icon: "warning"
          });
        }
      })
    }

  }

  return (
    <div>
      <div className='home-component'>
        <div className="container  text-md-left">
          
            <header>
              <div className="row justify-content-between">
                <div className="col-2">
                  {/* <img src={logo} alt="logo"> */}
                  <img src={logo} width="100" height="100" />
                </div>
                <div className="col-6 align-self-center text-right">
                  <a href="#" className="text-white lead cta-back ">เข้าใช้งานระบบ Picking Online </a>
                  <div style={{ marginTop: 20 }}>
                   
                    <Card >
                      <Card.Body>
                        <Form onSubmit={loginsystem}>
                          <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="User name" onChange={(e) => setLoginU({ ...loginU, username: e.target.value })} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setLoginU({ ...loginU, password: e.target.value })} />
                          </Form.Group>
                          <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" type='submit'>
                              LOGIN
                            </Button>
                          </div>
                          <div style={{ fontSize: 15 }} className='align-center-end'>
                            <label style={{ margin: 5, padding: 5, color: "#0e528e" }}><a href='#'>ลืมรหัสเข้าใช้งาน </a></label>
                            <label style={{ margin: 5, padding: 5, color: "#994d2d" }}><a href='/repassword'>เปลี่ยนรหัส</a></label>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  

                  </div>
                </div>
              </div>
            </header>
          
          <h1 className="display-3 text-white font-weight-bold my-5 start-justify">
            System Picking Online<br />
            To Start Business
          </h1>

          <p className="lead text-white my-4 start-justify">
            PERM POON PATANA INDUSTRY COMPANY LIMITED
            <br /> Thailand leading manufacturer,
            <br /> exporter and distributor of cotton products
            {/* <br /> Illum iusto laoreet his te. Lorem partiendo mel ex. Ad vitae admodum voluptatum per. */}
          </p>
          <a href="#" className='start-justify atlas-cta cta-green'
            style={{ margin: 5, padding: 10, width: 165, height: 50, borderRadius: 20 }}>Get Started</a>
        </div>
      </div>

    </div >
  )
}

export default Homepage