import React, { useState, useEffect } from 'react'
import { urlcall } from '../config';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import Tablejournal from './conponent/tablejournal';
import Modal from 'react-bootstrap/Modal';
import { FaFileUpload, FaDiceD6 } from "react-icons/fa";
import { GrUnorderedList } from "react-icons/gr";
import { PiBarcode } from "react-icons/pi";
import InventListPage from './inventList/inventList.Page';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ViewTransition from './reportTransition/viewTransition';

import {
  getJournalAllStatus,
  getJournalStatusComplete,
  getJournalStatusNotComplete,
  getOnlinejournallist,
  journalByUploade,
  removejournalall
} from './service-all';

const JournallistPick = () => {
  var curr = new Date();
  curr.setDate(curr.getDate());
  var DateNow = curr.toISOString().substring(0, 10);
  var datePicks = Moment(DateNow).format('DD/MM/YYYY')


  const [journalList, setJournalList] = useState([])
  const [datsearch, setDatasearch] = useState([])
  const [UpdateJour, setUpdateJour] = useState([])
  const [fullscreen, setFullscreen] = useState(true)
  const [show, setShow] = useState(false);
  const [checkUploade, setCheckUploade] = useState(false);
  const [dateSearch, setDateSearch] = useState(DateNow);
  const [reloading, setReloading] = useState(false)
  const [date, setDate] = useState(datePicks);

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


  const filterBySearch = (event) => {
    // Access input value
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


    </div>
  )
}

export default JournallistPick