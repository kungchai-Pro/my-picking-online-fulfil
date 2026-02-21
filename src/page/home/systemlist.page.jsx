import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { BsBoxes } from "react-icons/bs";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import './Sample.css';

const localizer = momentLocalizer(moment)
const Uroles = sessionStorage.getItem("roles");

const now = new Date();
// const events = [
//     {
//         id: 0,
//         title: 'All Day Event very long title',
//         allDay: true,
//         start: new Date(2015, 3, 0),
//         end: new Date(2015, 3, 1),
//     },
//     {
//         id: 1,
//         title: 'Long Event',
//         start: new Date(2015, 3, 7),
//         end: new Date(2015, 3, 10),
//     },

//     {
//         id: 2,
//         title: 'DTS STARTS',
//         start: new Date(2016, 2, 13, 0, 0, 0),
//         end: new Date(2016, 2, 20, 0, 0, 0),
//     },

//     {
//         id: 3,
//         title: 'DTS ENDS',
//         start: new Date(2016, 10, 6, 0, 0, 0),
//         end: new Date(2016, 10, 13, 0, 0, 0),
//     },

//     {
//         id: 4,
//         title: 'Some Event',
//         start: new Date(2015, 3, 9, 0, 0, 0),
//         end: new Date(2015, 3, 10, 0, 0, 0),
//     },
//     {
//         id: 5,
//         title: 'Conference',
//         start: new Date(2015, 3, 11),
//         end: new Date(2015, 3, 13),
//         desc: 'Big conference for important people',
//     },
//     {
//         id: 6,
//         title: 'Meeting',
//         start: new Date(2015, 3, 12, 10, 30, 0, 0),
//         end: new Date(2015, 3, 12, 12, 30, 0, 0),
//         desc: 'Pre-meeting meeting, to prepare for the meeting',
//     },
//     {
//         id: 7,
//         title: 'Lunch',
//         start: new Date(2015, 3, 12, 12, 0, 0, 0),
//         end: new Date(2015, 3, 12, 13, 0, 0, 0),
//         desc: 'Power lunch',
//     },
//     {
//         id: 8,
//         title: 'Meeting',
//         start: new Date(2015, 3, 12, 14, 0, 0, 0),
//         end: new Date(2015, 3, 12, 15, 0, 0, 0),
//     },
//     {
//         id: 9,
//         title: 'Happy Hour',
//         start: new Date(2015, 3, 12, 17, 0, 0, 0),
//         end: new Date(2015, 3, 12, 17, 30, 0, 0),
//         desc: 'Most important meal of the day',
//     },
//     {
//         id: 10,
//         title: 'Dinner',
//         start: new Date(2015, 3, 12, 20, 0, 0, 0),
//         end: new Date(2015, 3, 12, 21, 0, 0, 0),
//     },
//     {
//         id: 11,
//         title: 'Birthday Party',
//         start: new Date(2015, 3, 13, 7, 0, 0),
//         end: new Date(2015, 3, 13, 10, 30, 0),
//     },
//     {
//         id: 12,
//         title: 'Late Night Event',
//         start: new Date(2015, 3, 17, 19, 30, 0),
//         end: new Date(2015, 3, 18, 2, 0, 0),
//     },
//     {
//         id: 12.5,
//         title: 'Late Same Night Event',
//         start: new Date(2015, 3, 17, 19, 30, 0),
//         end: new Date(2015, 3, 17, 23, 30, 0),
//     },
//     {
//         id: 13,
//         title: 'Multi-day Event',
//         start: new Date(2015, 3, 20, 19, 30, 0),
//         end: new Date(2015, 3, 22, 2, 0, 0),
//     },
//     {
//         id: 14,
//         title: 'Today',
//         start: new Date(new Date().setHours(new Date().getHours() - 3)),
//         end: new Date(new Date().setHours(new Date().getHours() + 3)),
//     },
//     {
//         id: 15,
//         title: 'Point in Time Event',
//         start: now,
//         end: now,
//     },
// ]

function Systemlistpage() {


    function OnSystemto() {
        if (Uroles == 'admin') {
            window.location.href = '/journallist'
        }
        else {
            window.location.href = '/journallistpick'
        }
    }

    return (
        <div style={{ padding: 10 }}>
            {/* <Container> */}
                <div className='row-page'>
                    <div style={{ width: '50%' }}>
                        <div style={{ height: '400pt' }} className="Sample__container">
                            
                            <Calendar
                                // events={events}
                                startAccessor="start"
                                endAccessor="end"
                                defaultDate={moment().toDate()}
                                localizer={localizer}
                            />
                        
                        </div>

                    </div>
                    <div className="Sample__container" style={{backgroundColor:'#F9F9F9',width:'50%'}}>
                        <Row>
                            <Card style={{ width: '15rem',height:'15rem', backgroundColor: '#F6E6E5' }}>
                                <Card.Body>
                                    <Card.Title><center>System Picking </center></Card.Title>
                                    <Card.Text>
                                        <center><BsBoxes size={100} /></center>
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => OnSystemto()}>Go To</Button>
                                </Card.Body>
                            </Card>
                        </Row>
                    </div>
                </div>

            {/* </Container > */}
        </div >
    )
}

export default Systemlistpage