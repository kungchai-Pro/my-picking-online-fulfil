import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
// import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { FaCheckCircle, FaClipboardCheck, FaCamera, FaBarcode, FaHome } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Moment from 'moment';
import { getOrderlineByOrderNumber } from '../../service-all';
import PopupImage from './popupImage';
const smart_protect1 = require('../../../../images/smart-protect-1.jpg')


const ShowdetailItem = ({ dataList, OrderNumber }) => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [imageItem, setImageItem] = useState("")
    const [Itemlist, setItemlist] = useState([]);
    const [dataloading, setDataloading] = useState(false);
    function handleShow(breakpoint) {
        setShow(true);
    }


    function showOrderline() {
        setDataloading(true)
        getOrderlineByOrderNumber(OrderNumber).then((res) => {

            if (res.status == 200) {

                setItemlist(res.data)
                
                setDataloading(false)
            }
        })
    }


    function ShowImage(values) {
        const datalist = dataList.find((item) => item.OrderNumber == OrderNumber);
       
        setImageItem(datalist);
        showOrderline();
        
        handleShow(values)
    }

    return (
        <div>
            <div><Button onClick={() => ShowImage(true)}>Details <MdOutlineRateReview /> </Button></div>

            <Modal
                show={show}
                fullscreen={fullscreen}
                onHide={() => setShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" > Details order </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Card>
                            <Card.Body>
                                <div className='row-page'>
                                    <div style={{ width: 350, height: 230, marginRight: 20 }}>
                                        <div style={{ width: 300, height: 200, backgroundColor: '#D0D1D1', borderRadius: 10, padding: 5 }}>
                                            {imageItem.ImageBox == "" ? <div>
                                                <center>
                                                    <CiImageOn size={100} />
                                                </center>
                                            </div> : <div>
                                                <center>
                                                    <PopupImage imagesID={imageItem.ImageBox} />
                                                </center>
                                            </div>}
                                        </div>
                                        <div style={{ margin: 5 }}>
                                            <center>Tracking Number : <b>{imageItem.OrderNumber}</b></center>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ margin: 5 }}>
                                            <div><b>Billing Name</b></div>
                                            <div style={{ fontSize: 13, marginLeft: 20 }}>{imageItem.BillingName}</div>
                                        </div>
                                        <div style={{ margin: 5 }}>
                                            <div><b>Billing Address</b></div>
                                            <div style={{ fontSize: 13, marginLeft: 20 }}>{imageItem.BillingAddress}</div>
                                        </div>
                                        <div style={{ margin: 5 }}>
                                            <div><b>Tele phone</b></div>
                                            <div style={{ fontSize: 13, marginLeft: 20 }}>{imageItem.Telephone}</div>
                                        </div>

                                        <div style={{ margin: 5 }}>
                                            <div><b>Qty  : ( {imageItem.TotalQty} )</b></div>

                                        </div>

                                        <div style={{ margin: 5 }}>
                                            <div><b>Status Order</b></div>
                                            <div style={{ fontSize: 13, marginLeft: 20 }}>
                                                {imageItem.StatusPacking == 1 ? <lable style={{ color: '#0CB837' }}><b>เสร็จแล้ว</b></lable> :
                                                    <label style={{ color: '#F35F15' }}><b>รอการ pick order</b></label>}</div>
                                        </div>
                                    </div>
                                </div>


                            </Card.Body>
                        </Card>

                        <Container>
                        {dataloading == true ? <center>
                                <div><Spinner size={40} variant="success" /></div>
                                <div><label>กำลังโหลด . . .</label></div>
                            </center> :<Row>
                                {Itemlist.map((item, i) => (
                                    <Card style={{ width: '50%' }}>
                                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                        <Card.Body>
                                            <Card.Title>{i + 1} {item.OrderQty == item.ScanQty && <div><label style={{ color: 'green', marginRight: 5 }}>เสร็จแล้ว</label><FaCheckCircle color='green' /></div>}</Card.Title>
                                            <div>

                                                <div className='space-between-row'>
                                                    <div style={{ width: '50%' }}>
                                                        <div style={{ width: '80%', height: 100, backgroundColor: '#E1DDDC' }}>
                                                            {item.Image !== "" ? <img src={item.Image} width="100%" height={100} /> :
                                                                <div><CiImageOn size={30} /></div>
                                                            }
                                                        </div>
                                                        {/* <div>{item.OrderNumber}</div> */}
                                                    </div>
                                                    <div style={{ width: '100%', fontSize: 14 }}>
                                                        <div><b>SKU</b> : {item.ItemOnlineSKU}</div>
                                                        <div><b>ITem</b> : {item.ItemId}</div>
                                                        <div><b>Name</b> : {item.ItemName}</div>
                                                        <div >
                                                            <table style={{ width: '100%' }}>
                                                                <tr>
                                                                    <th style={{ backgroundColor: '#D0D3D4' }}><center>QTY</center></th>
                                                                    <th style={{ backgroundColor: '#AAB7B8' }}><center>SCAN</center></th>
                                                                    <th style={{ backgroundColor: '#99A3A4' }}><center>DIFF</center></th>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#FBEEE6', color: '#2C3E50' }} ><center><b>{item.OrderQty}</b></center></td>
                                                                    <td style={{ backgroundColor: '#F6DDCC', color: '#3498DB' }}><center><b>{item.ScanQty}</b></center></td>
                                                                    <td style={{ backgroundColor: '#EDBB99', color: '#C0392B' }}><center><b>{item.OrderQty - item.ScanQty}</b></center></td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>{item.scandate != null ? <label style={{ fontSize: 13 }}>วันที่สแกน : {Moment(item.scandate).format('DD/MM/YYYY')}</label> : ""}</div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Row>
                            }
                        </Container>
                    </Container>



                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ShowdetailItem