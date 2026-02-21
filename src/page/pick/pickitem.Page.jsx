import React, { useEffect, useState, useRef } from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem, addQty, removeCountItem, clearcheckitem } from '../../reduxSlice/counterItemSlice';
import { FaCheckCircle, FaClipboardCheck, FaRegImage, FaBarcode, FaCamera } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import Swal from 'sweetalert2'
import Webcamcapture from './component/webcamcapture';
import ViewDetailpickpage from './component/viewDetailpickPage';
import ViewImage from './component/viewImage';
import Moment from 'moment';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import PopupImagepick from './popupImagepick';
import { urlcall } from '../config';
import Spinner from 'react-bootstrap/Spinner';
import {
  getHeaderByOrderNumber, getJournalBySaleOrder,
  getOrderLineByOrderNumber, updateOrderByid, updateOrderHeaderByid, UpdateStatusErpComplete
} from './servicepick-all';


const headerObject = {
  BillingAddress: "", BillingName: "", ImageBox: "", OrderDate: "", OrderNumber: "",
  OrderheadId: "", SaleOnlineId: "", ScanQty: "", StatusPacking: "", Telephone: "", TotalQty: 0
}
const journalObject = {
  CustAccount: "", CustName: "", Description: "", SaleChannel: "",
  SaleSOlineId: "", TotalOrder: "", TransDate: ""
}

export default function PickitemPage() {

  const dispatch = useDispatch();
  const usernames = sessionStorage.getItem("username");
  const ItemOrder = useSelector((state) => state.counterItem.value);
  const ItemCounting = useSelector((state) => state.counterItem.counting);
  const checkItem = useSelector((state) => state.counterItem.checkItem);
  const chekcountitem = useSelector((state) => state.counterItem.chekcountitem);

  const [HeaderList, setHeaderList] = useState({ ...headerObject });
  const [JournalList, setJournalList] = useState({ ...journalObject });
  const [ItemList, setItemList] = useState([]);
  const [TextCode, setTextCode] = useState("");
  const [ScanBarcode, setScanBarcode] = useState("");
  const [StatusPick, setStatusPick] = useState(false);
  const [scanloading, setScanloading] = useState(false);

  ///
  const [itemforcus, setItemforcus] = useState("");

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  var curr = new Date();
  curr.setDate(curr.getDate());
  var DateNow = curr.toISOString().substring(0, 10);
  var datePicks = Moment(DateNow).format('DD/MM/YYYY')

  useEffect(() => {
    inputRef1.current.focus();
  }, [])


  function handleKeyDown(event) {

    if (event.keyCode === 13) {
      // removeCountItem
      setScanloading(true);

      dispatch(removeCountItem());

      getHeaderByOrderNumber(TextCode).then((res) => {

        if (res.data.length > 0) {
          // setHeaderList(res.data[0])

          // getJournalList(res.data[0].SaleOnlineId)

          setTextCode("")
          if (res.data[0].StatusPacking == "1") {
            setStatusPick(true)
          }
          else {
            setStatusPick(false)
            inputRef2.current.focus();
          }

          setTimeout(() => {
            setScanloading(false)

            setHeaderList(res.data[0])

            getJournalList(res.data[0].SaleOnlineId)
          }, 550);

        }
        else {

          setJournalList({ ...journalObject })
          setHeaderList({ ...headerObject })
          dispatch(addItem([]));
          // alert('ไม่พบข้อมูลที่ต้องการค้นหา')
          Swal.fire({
            title: "แจ้งเตือน !",
            text: "ไม่พบข้อมูล Tracking number  นี้ใน Order",
            icon: "warning"
          });


          setScanloading(false)


        }

      })
    }
  }

  function getJournalList(saleorderId) {

    getJournalBySaleOrder(saleorderId).then((res) => {

      if (res.data.length > 0) {
        setJournalList(res.data[0])
        getItemList()
      } else {
        setJournalList(res.data[0])
        getItemList()
      }


    })
  }


  function getItemList() {

    getOrderLineByOrderNumber(TextCode).then((res) => {

      if (res.data.length > 0) {
        setItemList(res.data)
        dispatch(addItem(res.data));
      }

    })
  }

  function UpdateItemOrder(event) {

    setItemforcus(ScanBarcode);

    if (event.keyCode === 13) {
      setTimeout(() => {
        dispatch(updateItem(ScanBarcode));
      }, 400);

      setScanBarcode("")

    }

    setTimeout(() => {
      setItemforcus(ScanBarcode);

    }, 1000);

  }

  function confirmpicking() {
    var countCheck = false;
    if (HeaderList.StatusPacking == "1") {
      Swal.fire({
        title: "แจ้งเตือน !",
        text: "รายนี้คุณได้ทำการ confirm order เรียบแล้ว",
        icon: "warning"
      });

    } else {

      for (let index = 0; index < ItemOrder.length; index++) {
        const valueOrder = ItemOrder[index];
        if (valueOrder.ScanQty != valueOrder.OrderQty) {
          countCheck = true
        }

      }
      if (countCheck == true) {
        Swal.fire({
          title: "แจ้งเตือน !",
          text: "มีรายการยังไม่ได้สแกน",
          icon: "warning",

        });
      }
      else if (ItemOrder.length == 0) {
        Swal.fire({
          title: "แจ้งเตือน !",
          text: "ยังไม่มีรายการให้บันทัก",
          icon: "warning",

        });
      }
      else if (HeaderList.ImageBox == "") {
        Swal.fire({
          title: "แจ้งเตือน !",
          text: "คุณยังไม่ได้ทำการ ถ่ายภาพสินค้า",
          icon: "warning"
        });
      }
      else {

        Swal.fire({
          title: "บันทึกข้อมูล ? ",
          text: "คุณต้องการที่จะบันทึกใช่หรือไม่ !",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "บันทึก"
        }).then((result) => {

          if (result.isConfirmed) {

            var OrderheadId = HeaderList.OrderheadId;


            UploadFiles(OrderheadId, HeaderList.ImageBox, ItemOrder);

          }

        });
      }
    }

  }

  function capthotoImage(imageFile) {
    setHeaderList({ ...HeaderList, ImageBox: imageFile })
  }

  function AlertCheckItemScan() {

    Swal.fire({
      title: "แจ้งเตือน !",
      text: "ไม่พบข้อมูลนี้ใน Order,กรุณาตรวจสอบข้อมูล",
      icon: "error"
    });
    dispatch(clearcheckitem())
  }


  function AlertCountItemScan() {

    Swal.fire({
      title: "แจ้งเตือน !",
      text: "Serial นี้ได้สแกนครบตามจำนวนเรียบร้อยแล้ว",
      icon: "success"
    });
    dispatch(clearcheckitem())
  }

  function UploadFiles(OrderheadId, file, ItemOrder) {

    var urlImage = `${urlcall.url_sql_call}images/files/`;
    try {

      axios.post(urlcall.url_sql_call + 'images/webcamuploadfile', { image: file }).
        then(function (response) {

          if (response.status == 200) {
            updateOrderHeaderByid(OrderheadId, ItemCounting, usernames, urlImage + response.data.filename).then(res => {
              if (res.affectedRows >= 1) {

                var i = 0;
                for (let index = 0; index < ItemOrder.length; index++) {
                  const valueOrder = ItemOrder[index];

                  updateOrderByid(valueOrder.OrderlineId, valueOrder.ScanQty, valueOrder, usernames) // update orderbyid
                  i++;
                }

                if (ItemOrder.length == i) {

                  Swal.fire({
                    title: "บันทึกข้อมูล!",
                    text: "คุณได้บันข้อมูลเรียร้อยแล้ว",
                    icon: "success",

                  }).then((result) => {

                    if (result.isConfirmed) {
                      UpdateStatusErpComplete(JournalList.SaleSOlineId)

                      setTimeout(() => {

                        window.location.reload()
                      }, 1800);

                    }

                  })

                  setTimeout(() => {
                    UpdateStatusErpComplete(JournalList.SaleSOlineId)
                    window.location.reload()
                  }, 1800);
                }


              } else {
                alert('error : ' + res)
              }
            })



          }

        })

    } catch (error) {
      console.error('Error sending image to server:', error);
    }


  }

  return (
    <div >

      <div className='space-between-row' style={{ margin: 10, padding: 5 }}>
        <div className='space-between-row'>

          <div className='row-page'>
            <div>
              <input type='text' name='Orderbarcode' placeholder='ORDER BARCODE'
                style={{ width: 300 }} value={TextCode}
                ref={inputRef1}
                onKeyDown={handleKeyDown} onChange={(e) => setTextCode(e.target.value)}
              />
              <label style={{ fontSize: 20 }}> [<FaBarcode />]</label>
            </div>
            <div style={{ marginLeft: 20 }}>
              <div>
                <DatePicker
                  value={datePicks}
                  placeholderText="DD/MM/YYYY"
                  style={{ width: 200, marginRight: 20 }}
                  disabled
                />
              </div>
            </div>

          </div>

          <div style={{ marginRight: 20, width: 350 }}>

            {HeaderList.OrderheadId !== "" ? <ViewDetailpickpage saleorderId={HeaderList.SaleOnlineId} /> :
              <Button size='sm' onClick={() => alert('ยังไม่มีข้อมูล')}>Go to Issue Packing Details</Button>}
          </div>
        </div>

      </div>
      <div>
        <div style={{ padding: 10, fontSize: 12 }}>

          <Table striped bordered hover>
            <thead>
              <tr>
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
                <td>{JournalList.SaleSOlineId}</td>
                <td>
                  {Moment(JournalList.TransDate).format('DD/MM/YYYY')}

                </td>
                <td>{JournalList.SaleChannel}</td>
                <td>{JournalList.CustName}</td>
                <td>{JournalList.Description}</td>
                <td>{JournalList.TotalOrder}</td>
                <td>{JournalList.countStatus}</td>
                <td>{JournalList.TotalOrder !== "" && JournalList.TotalOrder - JournalList.countStatus}</td>
              </tr>
            </tbody>
          </Table>

        </div>
      </div>
      <div style={{ padding: 5, fontSize: 12 }} className='row-page-width-0'>
        <div style={{ width: '80%', backgroundColor: '#F6F2F1', padding: 3 }}>

          <table style={{ width: '100%' }}>
            <tr>
              <th>Tracking Number</th>
              <th>Billing Name</th>
              <th>Billing Address</th>
              <th>เบอร์โทร</th>
              <th style={{ width: '5%' }}>Total</th>
              <th style={{ width: '5%' }}>Scan</th>
              <th style={{ width: '5%' }}>Pending</th>
            </tr>
            <tr>
              <td>{HeaderList.OrderNumber}</td>
              <td>{HeaderList.BillingName}</td>
              <td>{HeaderList.BillingAddress}</td>
              <td>{HeaderList.Telephone}</td>
              <td>{HeaderList.TotalQty}</td>
              <td>{HeaderList.ScanQty == 0 ? ItemCounting : HeaderList.ScanQty}</td>
              <td>{HeaderList.ScanQty == 0 ? HeaderList.TotalQty - ItemCounting : HeaderList.TotalQty - HeaderList.ScanQty}</td>
            </tr>
          </table>

        </div>
        <div style={{
          height: 'auto', width: '20%', marginLeft: 10, backgroundColor: '#F6F2F1',
          alignItems: 'center', justifyItems: 'center', flexDirection: 'column'
        }}>
          <center>  {HeaderList.ImageBox == "" ? <FaRegImage size={70} /> :
            <PopupImagepick imagesID={HeaderList.ImageBox} />
          }
          </center>
        </div>
      </div>
      {StatusPick == true && <center><label style={{ color: 'red', fontSize: 18 }}> Order number : {HeaderList.OrderNumber} เสร็จเรียบร้อยแล้ว </label></center>}
      <hr></hr>
      <div style={{ padding: 10 }} className='row-page-between'>
        <div className='row-page'>
          <div>
            <input name='ItemBarcode' type='text' placeholder='INPUT BARCODE OF ITEM' style={{ width: 300 }}
              ref={inputRef2}
              onKeyDown={UpdateItemOrder} onChange={(e) => setScanBarcode(e.target.value)}
              value={ScanBarcode} disabled={StatusPick} /><label style={{ fontSize: 20 }}> [<FaBarcode />]</label>
          </div>
          <div style={{ marginLeft: 5, marginTop: 5 }}>

            {checkItem == true ? <lable style={{ color: 'red', fontSize: 18 }}>{AlertCheckItemScan()}</lable> : ""}

            {chekcountitem == true ? <div style={{ color: '#3E80F4', fontSize: 20 }}>{AlertCountItemScan()}</div> : ""}

          </div>
        </div>

        <div className='row-page-width-0' style={{ width: '40%' }}>
          <div style={{ marginRight: 10, padding: 5 }}   >
            {HeaderList.TotalQty == 0 ? <Button variant="warning" style={{ height: 50 }} disabled={true}><FaCamera /> CAPTURE BOX</Button> :
              <div>
                {HeaderList.TotalQty - ItemCounting != 0 ?
                  <Button variant="warning" style={{ height: 50 }} disabled={true}><FaCamera /> CAPTURE BOX</Button>
                  : <Webcamcapture capthotoImage={capthotoImage} StatusPick={StatusPick} />}
              </div>}


          </div>
          <div style={{ padding: 5 }} >
            <Button variant="success" style={{ height: 50 }} onClick={() => confirmpicking()} disabled={StatusPick} ><FaClipboardCheck /> CONFIRM PICKING</Button></div>
        </div>
      </div>

      {scanloading == true ? <div>
        <center>
          <div>
            <Spinner animation="border" variant="success" />
          </div>
          <lable style={{ fontSize: 18, color: 'green' }} >  Loading ...</lable>
        </center>
      </div> :
        <div>

          {ItemList.length == 0 ? <div style={{ height: 300, justifyItems: 'center', flexDirection: 'column', alignContent: 'center' }}>
            <center>ยังไม่พบข้อมูล ? </center>
          </div> : <div>
            <Container fluid style={{ margin: 10 }}>
              <Row>
                {ItemOrder.map((item, i) => (
                  <Card style={{ width: '30rem' }}>

                    <Card.Body>
                      <Card.Title>{i + 1}
                      </Card.Title>
                      <div>

                        <div style={{ backgroundColor: item.OrderQty == item.ScanQty ? '#737070' : '#DD1501', width: '100%', height: 10 }}>
                        </div>

                        <div className='space-between-row' style={{ backgroundColor: itemforcus == item.Barcode ? '#F2BE0F' : '#FFFF' }}>
                          <div style={{ width: '50%' }}>
                            <div style={{ width: '80%', height: 110, backgroundColor: '#E1DDDC' }}>
                              {item.Image !== "" ? <ViewImage imagesID={item.Image} ItemName={item.ItemName} />
                                :
                                <div><CiImageOn size={30} /></div>
                              }
                            </div>
                            <div>{item.Barcode}</div>
                          </div>
                          <div style={{ width: '50%', fontSize: 14 }} >
                            <div><b>SKU</b> : {item.ItemOnlineSKU}</div>
                            <div><b>ITem</b> : {item.ItemId}</div>
                            <div><b>Name</b> : {item.ItemName}</div>
                            <div >
                              <table style={{ width: '80%' }}>
                                <tr>
                                  <th style={{ backgroundColor: '#D0D3D4' }}><center>QTY</center></th>
                                  <th style={{ backgroundColor: '#AAB7B8' }}><center>SCAN</center></th>
                                  <th style={{ backgroundColor: '#99A3A4' }}><center>DIFF</center></th>
                                  <th ><center></center></th>
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
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Row>
            </Container>
          </div>}
        </div>}

    </div >
  )
}
