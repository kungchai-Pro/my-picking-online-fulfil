import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {UPdateInventByid,getInventItemByid} from '../service-all';


const UpdateInvent = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const[inventdata,setInventdata]=useState({ItemName:"", Barcode:"" })

    function PopUpInvent(val){
        setModalShow(val)
        props.loadDataInvent() // loading data
        getinvent(props.Id)
        // alert(props.Id)
    }

    function getinvent(ids){

        getInventItemByid(ids).then((res)=>{
            if(res){
                console.log(res)
                setInventdata(res.data[0])
            }
        })
    }

    function isSaveUpdate(){
        UPdateInventByid(props.Id,inventdata).then((res)=>{
      
            if(res){
               props.loadDataInvent() // loading data
                 setModalShow(false)
            }
        })
    }

  return (
        <>
      <Button 
      variant="warning"
      onClick={() => PopUpInvent(true)} size='sm'>
        Edit
      </Button>


          <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
         แก้ไขข้อมูล 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div>
                <div>
                    <label style={{width:200}}>Item name</label>
                    <input type='text' 
                    value={inventdata.ItemName}
                    name='itemname' onChange={(e)=>setInventdata({...inventdata,ItemName:e.target.value})} style={{width:'70%'}}/>
                </div>
                <p/>
                <div>
                    <label style={{width:200}}>barcode</label>
                    <input type='text' name='barcode' 
                    value={inventdata.Barcode}
                    onChange={(e)=>setInventdata({...inventdata,Barcode:e.target.value})}
                    />
                </div>
            </div>
      </Modal.Body>
      <Modal.Footer>
         <Button onClick={()=>isSaveUpdate(false)} variant="success">บันทึก</Button>
        <Button onClick={()=>setModalShow(false)} variant="warning">ยกเลิก</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default UpdateInvent