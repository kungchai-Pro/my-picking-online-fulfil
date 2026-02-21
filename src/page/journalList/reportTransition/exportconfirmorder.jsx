import React, { useEffect, useState } from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { getOrderjournalconfirmlist, getTransactionByDateload, getTransactionByinvoicedate } from '../service-all';
import { FaFileUpload, FaRegFileExcel, FaCheckCircle, FaDiceD6 } from "react-icons/fa";
import Tableconfirmorder from './tableconfirmorder';
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';

const Exportconfirmorder = () => {
    var curr = new Date();
    curr.setDate(curr.getDate());

    var DateNow = curr.toISOString().substring(0, 10);

    var datePicks = Moment(DateNow).format('DD/MM/YYYY')
    var getDate = Moment(DateNow).format('YYYY-MM-DD')

    const fileName = `packing-list${getDate}`;
    const [data, setData] = React.useState([]);
    const [searchText, setSearchText] = useState([])

    const [dateStart, setDateStart] = useState(getDate); //เอาไว้ค้นหาใน ดาต้าเบส วันที่เริ่ม
    const [dateStartText, setDateStartText] = useState(datePicks);

    const [dateEnd, setDateEnd] = useState(getDate); //เอาไว้ค้นหาใน ดาต้าเบส วันที่เริ่ม
    const [dateEndText, setDateEndText] = useState(datePicks);
    const [loading, setLoading] = useState(true)
    const [typedate, setTypeDate] = useState("1")

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    useEffect(() => {

        getJournalLineList()

        setTimeout(() => {
            setLoading(false)
        }, 1000);

    }, [])

    const SearchPickingBydate = () => {
        if (typedate == '1') {
            getJournalLineList()
        } else if (typedate == '2') {
            getJournalLineBydateLoad()
        } else if (typedate == '3') {
            getJournalLineByinvoicDate()
        }
    }

    const getJournalLineList = () => {
        setLoading(true)
        getOrderjournalconfirmlist(dateStart, dateEnd).then((res) => {
            console.log(res)
            if (res.status == 200) {
                setData(res.data)
                setSearchText(res.data)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        })
    }

    const getJournalLineBydateLoad = () => {
        setLoading(true)
        getTransactionByDateload(dateStart, dateEnd).then((res) => {
            console.log(res)
            if (res.status == 200) {
                setData(res.data)
                setSearchText(res.data)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        })
    }

    const getJournalLineByinvoicDate = () => {
        setLoading(true)

        getTransactionByinvoicedate(dateStart, dateEnd).then((res) => {
            console.log(res)
            if (res.status == 200) {
                
                setData(res.data)

                setSearchText(res.data)

                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        })
    }

    const hendleDateStart = (e) => {

        var dataDate = Moment(e).format('YYYY-MM-DD')
        setDateStart(dataDate)

        var datePicks = Moment(e).format('DD/MM/YYYY')
        setDateStartText(datePicks)

        // setDate(datePicks);
    }

    const hendleDateEnd = (e) => {

        var dataDate = Moment(e).format('YYYY-MM-DD')

        setDateEnd(dataDate)
        var datePicks = Moment(e).format('DD/MM/YYYY')
        // setDate(datePicks);
        setDateEndText(datePicks)

    }

    const filterBySearch = (event) => {

        const query = event.target.value;

        const filteredData = searchText.filter(item => {
            return Object.values(item)
                .join('')
                .toLowerCase()
                .includes(query.toLowerCase());
        });

        setData(filteredData);
    };

    const hendleTypeSearch = (e) => {
        console.log(e.target.value)
        setTypeDate(e.target.value)
    }



    return (
        <div>
            <div style={{ backgroundColor: "#EAE9E9", padding: 10 }}>
                <center>
                    <b>แสดงรายการ Packing List </b>
                </center>
            </div>

            <div className='row-page-between' style={{ width: '100%', backgroundColor: "#EAE9E9", padding: 10 }}>
                <div className='row-page-width-0'>
                    <div className='row-page-width-0' style={{ marginRight: 10 }}>
                        <label style={{ marginRight: 5 }}>เริ่มวันที่</label>
                        <DatePicker
                            //  selected={date}
                            value={dateStartText}
                            onChange={(e) => hendleDateStart(e)}
                            placeholderText="DD/MM/YYYY"
                            // dateFormat="dd/MM/YYYY"
                            // placeholder='dd/MM/YYYY'
                            style={{ width: 200, marginRight: 20 }}
                        />
                    </div>
                    <div className='row-page-width-0' style={{ marginRight: 10 }}>
                        <label style={{ marginRight: 5 }}>สิ้นสุดวันที่</label>
                        <DatePicker
                            //  selected={date}
                            value={dateEndText}
                            onChange={(e) => hendleDateEnd(e)}
                            placeholderText="DD/MM/YYYY"
                            // dateFormat="dd/MM/YYYY"
                            // placeholder='dd/MM/YYYY'
                            style={{ width: 200, marginRight: 20 }}
                        />
                    </div>
                    <div>
                        <Button size='sm' onClick={() => SearchPickingBydate()}>ค้นหา</Button>
                    </div>
                </div>

                <div className='row-end ' >
                    <div style={{ marginRight: 20 }}>
                        <input type='text' placeholder='ค้นหา' onChange={filterBySearch} />
                    </div>
                    <div>
                        <Button onClick={(e) => exportToCSV(data, fileName)} size='sm'><FaRegFileExcel />Export</Button>
                    </div>
                </div>
            </div>

            <div className='row-page-width-0' style={{ padding: 5 }}>
                <div style={{ marginLeft: 10, marginRight: 10 }}>
                    <input type='radio' name='typdate' value={'1'} onChange={(e) => hendleTypeSearch(e)} defaultChecked /> <label>ค้นหวันที่ Packing</label>
                </div>
                <div style={{ marginLeft: 10, marginRight: 10 }}>
                    <input type='radio' name='typdate' value={'2'} onChange={(e) => hendleTypeSearch(e)} /> <label>ค้นหวันที่ โหลดข้อมูล </label>
                </div>
                <div >
                    <input type='radio' name='typdate' value={'3'} onChange={(e) => hendleTypeSearch(e)} /> <label>ค้นหวันที่ Invoiced Date </label>
                </div>
            </div>

            <hr></hr>
            <div style={{ marginTop: 5 }}>
                {loading == true ? <div style={{
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', alignContent: 'center', height: 500
                }}>
                    <center>
                        <div><Spinner size={40} variant="success" /></div>
                        <div><label>กำลังโหลด . . .</label></div>
                    </center>
                </div> :
                    <Tableconfirmorder data={data} />}
            </div>
        </div>
    )
}

export default Exportconfirmorder   