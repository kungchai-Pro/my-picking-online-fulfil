import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap';
import Tablejournal from './conponent/tablejournal';
import Modal from 'react-bootstrap/Modal';
import { FaFileUpload, FaRegFileExcel, FaCheckCircle, FaDiceD6 } from "react-icons/fa";

import { GrUnorderedList } from "react-icons/gr";
import { PiBarcode } from "react-icons/pi";
import InventListPage from './inventList/inventList.Page';
import Spinner from 'react-bootstrap/Spinner';
import Moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ViewTransition from './reportTransition/viewTransition';
import {
  getInventListUpdate,
  getJournalAllStatus,
  getJournalStatusComplete,
  getJournalStatusNotComplete,
  getOnlinejournallist,
  journalByUploade,
  getJournalListUpload,
  getheaderJouranlUpload,
  getlineOrderUpload

} from './service-all';

const Journallist = () => {
  var curr = new Date();
  curr.setDate(curr.getDate());
  var DateNow = curr.toISOString().substring(0, 10);
  var datePicks = Moment(DateNow).format('DD/MM/YYYY')

  const [journalList, setJournalList] = useState([])
  const [UpdateJour, setUpdateJour] = useState([])
  const [datsearch, setDatasearch] = useState([])
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const [dateSearch, setDateSearch] = useState(DateNow);
  const [reloading, setReloading] = useState(false)
  const [date, setDate] = useState(datePicks);

  const [checkUploadjour, setCheckUploadjour] = useState(false);
  const [dataUploadjour, setDataUpload] = useState([]);

  const [checkUploadheader, setCheckUploadheader] = useState(false);
  const [dataUploadheader, setDataUploadheader] = useState([]);

  const [checkUploadline, setCheckUploadline] = useState(false);
  const [dataUploadline, setDataUploadline] = useState([]);


  useEffect(() => {
    getJournalBydate(dateSearch)
    journalBydateUploade()
  }, [])

  function handleShow(breakpoint) {
    setShow(true);
  }



  function getJournalBydate(datedate) {

    setReloading(true);
    getOnlinejournallist(datedate).then((res) => {
      if (res.status == 200) {
        setJournalList(res.data)
        setDatasearch(res.data)

        setTimeout(() => {
          setReloading(false)
        }, 1000);

      }
    })
      .catch(function (error) {
        console.log(error);
      })


  }


  function journalBydateUploade() {

    journalByUploade().then((res) => {
      if (res.success = true) {
        setUpdateJour(res.listall)
      }
    })
      .catch(function (error) {
        console.log(error);
      })

  }

  //insert to sql table jouranl
  function uploadingAllOrderjornal() {

    setCheckUploadjour(true)
    setCheckUploadheader(true)
    setCheckUploadline(true)

    getInventListUpdate(); //uploade invent  table new

    getJournalListUpload().then((res) => { //upload journal all

      if (res.status == 200) {
        setDataUpload(res);
        setCheckUploadjour(false)

        getheaderJouranlUpload().then((res) => { //upload header all
          if (res.status == 200) {
            setDataUploadheader(res)
            setCheckUploadheader(false)
          }
          
          getlineOrderUpload().then((res) => { //upload line all
            if (res.status == 200) {
              setDataUploadline(res)
              setCheckUploadline(false)
            }
          })

        })
      }

    })

  }



  const filterBySearch = (event) => {

    const query = event.target.value;

    const filteredData = datsearch.filter(item => {
      return Object.values(item)
        .join('')
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setJournalList(filteredData);
  };


  const SearchStatus = (e) => {
    var values = e.target.value;
    if (values == "1") {
      setReloading(true);

      getJournalAllStatus().then((res) => {
        if (res.status == 200) {
          setJournalList(res.data)
          setReloading(false)
        }

      })
    }
    else if (values == "2") {

      setReloading(true);
      getJournalStatusComplete().then((res) => {
        if (res.status == 200) {
          setJournalList(res.data)
          setReloading(false);
        }

      })

    }
    else if (values == "3") {
      setReloading(true);
      getJournalStatusNotComplete().then((res) => {
        if (res.status == 200) {
          setJournalList(res.data)
          setReloading(false);
        }

      })
    }
  }


  const getOrderByDate = (e) => {

    var dataDate = Moment(e).format('YYYY-MM-DD')

    getJournalBydate(dataDate)
    var datePicks = Moment(e).format('DD/MM/YYYY')
    setDate(datePicks);
  }

  const Refreshloading = () => {
    window.location.reload();
  }

  return (
    <div>
      <div className='row-page-between' style={{ padding: 10 }}>

        <div style={{ padding: 10 }}>
          <div className='row-page'>
            <div style={{ marginRight: 5 }}>
              <lable>ค้นหาวันที่ :</lable>
              <DatePicker
                //  selected={date}
                value={date}
                onChange={(e) => getOrderByDate(e)}
                placeholderText="DD/MM/YYYY"
                // dateFormat="dd/MM/YYYY"
                // placeholder='dd/MM/YYYY'
                style={{ width: 200, marginRight: 20 }}
              />
            </div>

            <div>
              <input type='text' name='textsearch' placeholder='ค้นหา' onChange={filterBySearch} />
            </div>
            <div>
              <select id="cars" style={{ marginLeft: 20, height: 30, width: 300 }} onChange={(e) => SearchStatus(e)}>
                <option value="0" selected>สถานะเอกสาร</option>
                <option value="1" >สถานะรวมทั้งหมด</option>
                <option value="2">สถานะเสร็จแล้ว</option>
                <option value="3">สถานะยังไม่เสร็จ</option>
              </select>
            </div>
          </div>
        </div>
        <div className='row-page-width-0' style={{ marginRight: 10 }}>
          <div>
            <ViewTransition />
          </div>
          <div style={{ marginRight: 5 }}>
            <InventListPage />
          </div>
          <div>
            <Button onClick={() => handleShow(true)} style={{ marginRight: 5 }}><GrUnorderedList /> Upload Order </Button>
          </div>
          <div >
            <a href='/packing'><Button variant="warning"><PiBarcode /> SCAN ORDER</Button></a>
          </div>
        </div>
      </div>
      <hr></hr>
      {reloading == true ? <div style={{
        flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center', alignContent: 'center', height: 500
      }}>
        <center>
          <div><Spinner size={40} variant="success" /></div>
          <div><label>กำลังโหลด . . .</label></div>
        </center>
      </div> : <div><Tablejournal data={journalList} /></div>}


      <Modal show={show} size="lg" onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order To date now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>รายการ Order journal :  ( {UpdateJour.length} )</div>
            <div><Button variant="warning" onClick={() => uploadingAllOrderjornal()} ><FaFileUpload /> Upload Now</Button></div>
            <div>
              {checkUploadjour == true ? <div>
                <label><Spinner size={40} variant="success" /> กำลัง loading jouranl list ... </label>
              </div> :
                <div>
                  {dataUploadjour.length != 0 ? <div>
                    <label style={{ color: '#0D8A4C' }}>total uplaoding ( {dataUploadjour.totalall} ) upload journal เสร็จแล้ว  <FaCheckCircle /></label>
                  </div> : ""}

                </div>}
            </div>
            <div>
              {checkUploadheader == true ? <div>
                <label><Spinner size={40} variant="success" /> กำลัง loading jouranl header  list ... </label>
              </div> : <div>
                {dataUploadheader.length != 0 ? <div>
                  <label style={{ color: '#0D8A4C' }} >total uplaoding ( {dataUploadheader.totalall} ) upload journal header เสร็จแล้ว  <FaCheckCircle /></label>
                </div> : ""}

              </div>}
            </div>
            <div>
              {checkUploadline == true ? <div>
                <label><Spinner size={40} variant="success" /> กำลัง loading jouranl order line list ... </label>
              </div> :
                <div>
                  {dataUploadline.length != 0 ? <div>
                    <label style={{ color: '#0D8A4C' }}>total uplaoding  ( {dataUploadline.totalall} ) upload jouranl order line เสร็จแล้ว  <FaCheckCircle /></label>
                  </div> : ""}

                </div>}
            </div>
            <div>
              <center>
                {dataUploadline.length != 0 && <di>
                  {checkUploadjour == false && <div>
                    {checkUploadheader == false && <div>
                      {checkUploadline == false && <div>
                        <Button onClick={() => Refreshloading()}>เสร็จเรียบแล้ว กด Refresh </Button>
                      </div>}
                    </div>}
                  </div>}
                </di>
                }

              </center>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default Journallist