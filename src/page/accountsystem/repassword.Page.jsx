import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import icon from '../../images/pppi001.png';
import { loginUser, Update_ChangePassword } from '../accountsystem/service-all';
import { FaChevronLeft } from "react-icons/fa";

function RepasswordPage() {

  const [putvalues, setPutvalues] = useState({ Id: "", username: "", password: "", newpassword: "" })

  const onChangeRepassword = (e) => {
    e.preventDefault();
    if (putvalues.username == "" || putvalues.password == "" || putvalues.newpassword == "") {

      // alert('กรุณาตรวจสอบข้อมูลก่อนบันทึก');
      Swal.fire({
        title: "แจ้งเตือน?",
        text: "กรุณาตรวจสอบข้อมูลก่อนบันทึก?",
        icon: "question"
      });

    }
    else {

      loginUser(putvalues).then((res) => {

        if (res) {
         


          var userObject = {
            Id: res.data[0].acId,
            username: putvalues.username,
            password: putvalues.newpassword,
          }

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

              Update_ChangePassword(userObject).then((res) => {
                if (res.status == 200) {

                  Swal.fire({
                    title: "เรียบร้อยแล้ว!",
                    text: "คุณได้ทำการบันทึกการเปลี่ยนรหัสแล้ว.",
                    icon: "success"
                  });

                  setTimeout(() => {
                    window.location.href = "/";
                    // HidePopup()
                  }, 1000);
                } else {
                
                }


              })
            }

          });

        } else {

          Swal.fire({
            title: "แจ้งเตือน?",
            text: "username  หรือ password ไม่ถูกต้อง?",
            icon: "question"
          });

        }

      })

    }
  }

  return (
    <div style={{ width: '100%', height: 800, backgroundColor: '#EDF7F9' }} className='align-center-column'>
      <form>
        <div style={{ borderRadius: 10, backgroundColor: '#ffff' }}>
          <div className='row-page' >
            <div style={{ width: 400, padding: 20 }} className='box-repassword'>
              <div>
                <div>
                  <img src={icon} style={{ width: 60, height: 70 }} />
                </div>
                <div style={{ margin: 20, fontSize: 18 }}><b>Choose an account</b></div>
              </div>
            </div>

            <div style={{ width: 400, height: 370, padding: 20 }}>
              <center><label>เปลี่ยนรหัสผู้ใช้งานระบบ</label></center>
              <div style={{ flexDirection: 'column', marginTop: 10 }}>
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" name='username' value={putvalues.username}
                  onChange={(e) => setPutvalues({ ...putvalues, username: e.target.value })} />

                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password'
                  onChange={(e) => setPutvalues({ ...putvalues, password: e.target.value })} />


                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" name='password'
                  onChange={(e) => setPutvalues({ ...putvalues, newpassword: e.target.value })} />
              </div>
              <div style={{ marginTop: 20, width: '100%' }}>
                <center>
                  <Button type='submit' style={{ marginRight: 20 }} variant="success" onClick={(e) => onChangeRepassword(e)}>แก้ไขรหัส</Button>
                  <Button type='reset' variant="warning" >ยกเลิก</Button>
                </center>
              </div>
              <div className='row-end ' style={{marginTop:10,fontSize:12,alignItems:'center',color:'#939494'}}>
                <a href='/' style={{color:'#939494'}}><FaChevronLeft /> <label>กลับหน้าหลัก </label></a> 
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RepasswordPage