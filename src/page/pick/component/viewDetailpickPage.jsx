import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { MdOutlineRateReview } from "react-icons/md";
import Card from 'react-bootstrap/Card';
import Moment from 'moment';
import { getJournalBySaleOrder, getHeaderBySaleOrder } from '../servicepick-all'
import TableViewdailpick from './tableViewdailpick';

function VeiwdailHeader({ saleorderId }) {

    const [journalOrder, setJournalOrder] = useState([]);
    const [journalline, setJournalline] = useState([]);
    const [journalSearch,setJournalSearch]=useState([])


    useEffect(() => {

        getHeader()
        getorderline()
    }, [])

    function getHeader() {
        getJournalBySaleOrder(saleorderId).then((res) => {
            setJournalOrder(res.data[0])
        })
    }

    function getorderline() {
        getHeaderBySaleOrder(saleorderId).then((res) => {
            setJournalline(res.data)
            setJournalSearch(res.data)
        })
    }

    const filterBySearch = (event) => {
        // Access input value
        const query = event.target.value;
    
        const filteredData = journalSearch.filter(item => {
          return Object.values(item)
            .join('')
            .toLowerCase()
            .includes(query.toLowerCase());
        });
        
        setJournalline(filteredData);
      };

      const SearchStatus = (e) => {
        var values = e.target.value;
        if (values == "1") {
      
        setJournalline(journalSearch);

        }
        else if (values == "2") {
            var valuesStatus=journalSearch.filter((item) => item.ScanQty == item.TotalQty);

            setJournalline(valuesStatus);
    
        }
        else if (values == "3") {
            var valuesStatus=journalSearch.filter((item) => item.ScanQty !== item.TotalQty);

            setJournalline(valuesStatus);

        }
      }


    return (
        <div>
            <div>
                <div style={{ backgroundColor: '#D6EAF8', padding: 5 }}>
                    <lable><b> SaleOnline </b></lable>
                </div>
                <Table striped bordered hover>
                    <thead >
                        <tr >
                            <th><center># SaleOnline</center></th>
                            <th><center>Date</center></th>
                            <th><center>Channel</center></th>
                            <th><center>Name</center></th>
                            <th><center>Description</center></th>
                            <th><center>Order total</center></th>
                            <th><center>Complete</center></th>
                            <th><center>Pending</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{journalOrder.SaleSOlineId}</td>
                            <td>
                                {/* {journalOrder.TransDate} */}
                                { Moment(journalOrder.TransDate).format('DD/MM/YYYY')}
                            </td>
                            <td>{journalOrder.SaleChannel}</td>
                            <td>{journalOrder.CustName}</td>
                            <td>{journalOrder.Description}</td>
                            <td><center>{journalOrder.TotalOrder}</center></td>
                            <td><center>{journalOrder.countStatus}</center></td>
                            <td><center>{journalOrder.TotalOrder - journalOrder.countStatus}</center></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <hr></hr>
            <div style={{ width: '100%', margin: 5 }}  >
                <div className='row-end'>
                    <div className='row-page'>
                        <div style={{marginRight:10}}>
                            <select id="cars" style={{ marginLeft: 20, height: 30, width: 300 }} onChange={(e) => SearchStatus(e)}>
                                <option value="0" selected>สถานะเอกสาร</option>
                                <option value="1" >สถานะรวมทั้งหมด</option>
                                <option value="2">สถานะเสร็จแล้ว</option>
                                <option value="3">สถานะยังไม่เสร็จ</option>
                            </select>
                        </div>
                        <div>
                            <input type='text' name='searchText' placeholder='ค้นหาข้อมูล' onChange={filterBySearch} style={{width:200}}/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <TableViewdailpick data={journalline} />

                </div>
            </div>
        </div>
    )
}


const ViewDetailpickpage = ({ saleorderId }) => {
          
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setShow(true);
    }

    return (
        <div>
            <Button onClick={() => handleShow(true)} size='sm'>Go to Issue Packing Details <MdOutlineRateReview /> </Button>

            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Issue Packing Details page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <VeiwdailHeader saleorderId={saleorderId} />
                </Modal.Body>
            </Modal>

        </div>

    )
}

export default ViewDetailpickpage