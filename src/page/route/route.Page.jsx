import React, { useState, useEffect } from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {  FaHome } from "react-icons/fa";
import { LiaSignOutAltSolid } from "react-icons/lia";
import Button from 'react-bootstrap/Button';
import Index from '../index'
import LoginPage from '../accountsystem/login.Page';
import Repassword from '../accountsystem/repassword.Page';
import PickitemPage from '../pick/pickitem.Page';
import ViewdetailPage from '../viewdetail/viewdetail.Page';
import AdditmelistPage from '../additem/additmelist.Page';
import ErrorPage from '../errorpage/error.page';
import Journallist from '../journalList/journallist.Page';
import JournallistPick from '../journalList/journallistPick.Page';
import CreateUserPage from '../accountsystem/createUser.Page';
import Systemlistpage from '../home/systemlist.page';

const Uroles = sessionStorage.getItem("roles");
var menuall = []
if (Uroles == 'admin') {
    menuall = [
        {
            path: "/",
            element: <Index />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/systemlist",
            element: <Systemlistpage />,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/packing",
            element: <PickitemPage />,
        },
        {
            path: "/journallist",
            element: <Journallist />,
        },
        {
            path: "/journallistpick",
            element: <JournallistPick />,
        },
        {
            path: "/viewdetail",
            element: <ViewdetailPage />,
        },
        {
            path: "/additmelist",
            element: <AdditmelistPage />,
        },
        {
            path: "/createuser",
            element: <CreateUserPage />,
        }
    ];
} else if(Uroles == 'user') {
    menuall = [
        {
            path: "/",
            element: <Index />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/systemlist",
            element: <Systemlistpage />,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/packing",
            element: <PickitemPage />,
        },
        // {
        //     path: "/journallist",
        //     element: <Journallist />,
        // },
        {
            path: "/journallistpick",
            element: <JournallistPick />,
        },
        {
            path: "/viewdetail",
            element: <ViewdetailPage />,
        },
        {
            path: "/additmelist",
            element: <AdditmelistPage />,
        },
        {
            path: "/createuser",
            element: <CreateUserPage />,
        }
    ];
}
else{
    menuall = [
        {
            path: "/",
            element: <Index />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/repassword",
            element: <Repassword />,
        },
    ];
}

const router = createBrowserRouter(menuall,{ basename: "/" });

export default function routepage() {
    var usernames = sessionStorage.getItem("username");

    function singout() {
        sessionStorage.clear();
        window.location.href = '/'
    }

    return (
        <div>
            {Uroles !== null && <div>
                {
                    Uroles == 'admin' ?
                        <div className='row-page' style={{ padding: 5, backgroundColor: '#ECF0ED' }}>
                            <div className='row-page-between'>
                                <div className='row-page'>
                                    <div style={{ marginRight: 5, width: 110 }}> <a href='/journallist'><Button variant="success" size='sm'><FaHome size={15} /> HOME</Button></a></div>
                                   
                                    
                                </div>
                                <div style={{ width: 500 }} className='row-page-between'>
                                   
                                    <div style={{ marginRight: 5, width: 110 }}><a href='/createuser'>สร้างผู้ใช้งาน</a></div>
                                    <div style={{ marginRight: 5, width: "auto" }}>ผู้ใช้งาน : {usernames}</div>
                                    <div style={{ marginRight: 5, width: 110 }}>
                                        <Button size='sm' variant="light" style={{ backgroundColor: '#ECF0ED' }} onClick={() => singout()}><LiaSignOutAltSolid size={20} /> SIGN OUT</Button>
                                    </div>
                                    </div>
                            </div>
                        </div> :
                        <div className='row-page' style={{ padding: 5, backgroundColor: '#ECF0ED' }}>
                            <div className='row-page-between'>
                                <div className='row-page'>
                                    <div style={{ marginRight: 5, width: 110 }}>
                                        <a href='/journallistpick'><Button variant="success" size='sm'><FaHome size={15} /> HOME</Button></a></div>
                                </div>
                                <div style={{ width: 400}} className='row-page-between'>
                                    <div style={{ marginRight: 5, width: "auto" }}>ผู้ใช้งาน : {usernames}</div>
                                    <div style={{ marginRight: 5, width: 110 }} >
                                        <Button size='sm' variant="light" style={{ backgroundColor: '#ECF0ED' }} onClick={() => singout()}><LiaSignOutAltSolid size={20}/> SIGN OUT</Button>
                                </div>
                                </div>
                            </div>
                        </div>
                }

            </div>}

            <RouterProvider router={router} />
        </div>
    )
}
