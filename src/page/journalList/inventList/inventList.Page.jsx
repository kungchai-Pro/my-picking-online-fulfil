import React, { useState, useEffect } from 'react';
import { FaFileUpload, FaDiceD6 } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getlistInventAll } from '../service-all';
import TableInvent from './tableInvent';

function InventListPage() {

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [inventlist, setInventlist] = useState([])
  const [searchText,setSearchText]=useState([])

  useEffect(() => {
    loadDataInvent()
  }, [])

  function loadDataInvent() {
    getlistInventAll().then((res) => {
      if (res.status == 200) {
        setInventlist(res.data)
        setSearchText(res.data)
      }
    })

  }

  function handleShow(breakpoint) {
    setShow(breakpoint);
  }


  function searchinventlist(e){
    var vulues =e.target.value;
        const filteredData = searchText.filter(item => {
      return Object.values(item)
        .join('')
        .toLowerCase()
        .includes(vulues.toLowerCase());
    });

    setInventlist(filteredData);

  }


  return (
    <div>
      <div>
        <Button variant="secondary" onClick={() => handleShow(true)}><FaDiceD6 /> Invent</Button>
      </div>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invent List </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{margin:10}}>
            <label style={{marginRight:10 }}>ค้นหา</label>
            <input type='text' name='searhcinvent' placeholder='ป้อนข้อมูลค้าหา' onChange={searchinventlist}/>
            </div>
          <TableInvent data={inventlist} loadDataInvent={loadDataInvent}/>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default InventListPage