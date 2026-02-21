import React from 'react'
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import ShowdetailItempick from './showdetailItempick';
import { MdOutlineRateReview } from "react-icons/md";
import Moment from 'moment';

const TableViewdailpick = ({ data }) => {

	const columns = [
		{
			name: 'Tracking Number',
			grow: 1.5,
			selector: row => row.OrderNumber,
			sortable: true,
		},
		{
			name: 'Invoiced Date',
			grow: 0.5,
			selector: row => <div>{Moment(row.Invoicedate).format('DD/MM/YYYY')}</div>,
			sortable: true,
		},
		{
			name: 'BillingName',
			selector: row => row.BillingName,
			sortable: true,
			grow: 1,
		},
		{
			name: 'BillingAddress',
			selector: row => row.BillingAddress,
			sortable: true,
			grow: 1,
		},
		{
			name: 'Telephone',
			selector: row => row.Telephone,
			grow: 1,
		},
		{
			name: 'TotalQty',
			selector: row => row.TotalQty,
		},
		{
			name: 'Scaned Qty',
			selector: row => row.ScanQty,
			sortable: true,
			grow: 1,
		},
		{
			name: 'Pending Qty',
			grow: 1,
			selector: row => <div>{row.TotalQty - row.ScanQty == 0 ? <lable style={{ color: '#08A12F' }}>
				{row.TotalQty - row.ScanQty}
			</lable> : <lable>
				{row.TotalQty - row.ScanQty}
			</lable>}</div>,
		},
		{
			name: 'Status',
			grow: 0.3,
			selector: row => <div>{row.TotalQty - row.ScanQty == 0 ? <div><FaCircle size={25} color='#08A12F' /></div> :
				<div><FaCircle size={25} color='#F75B29' /></div>}</div>,
			// conditionalCellStyles: [    
			// 	{
			// 		when: row => row.TotalQty - row.ScanQty != 0,
			// 		style: {
			// 			backgroundColor: '#F75B29',
			// 			color: 'white',
			// 			'&:hover': {
			// 				cursor: 'pointer',
			// 			},
			// 		},
			// 	},
			// {
			// 	when: row => row.QTY_RAFNEGATIVE >= 0 && row.QTY_RAFNEGATIVE < 0,
			// 	style: {
			// 		backgroundColor: 'rgba(248, 148, 6, 0.9)',
			// 		color: 'white',
			// 		'&:hover': {
			// 			cursor: 'pointer',
			// 		},
			// 	},
			// },
			// {
			// 	when: row => row.TotalQty - row.ScanQty == 0,
			// 	style: {
			// 		backgroundColor: '#08A12F',
			// 		color: 'white',
			// 		'&:hover': {
			// 			cursor: 'not-allowed',
			// 		},
			// 	},
			// },
			//],
		},
		{
			name: 'User Confirm',
			selector: row => row.Userconfirm,
		},
		{
			name: 'View Image',
			selector: row =>
				<ShowdetailItempick dataList={data} OrderNumber={row.OrderNumber} />
			,
		}
	];

	const customStyple = {
		headRow: {
			style: {
				border: 'none',
				backgroundColor: '#28B463'
			},
		},
		headCells: {
			style: {
				color: '#FFFF',
				fontSize: '14px',
			},
		},
		rows: {
			highlightOnHoverStyle: {
				backgroundColor: 'rgb(230, 244, 244)',
				borderBottomColor: '#FFFFFF',
				borderRadius: '25px',
				outline: '1px solid #FFFFFF',
			},
		},
		pagination: {
			style: {
				border: 'none',
			},
		},
	}


	return (
		<DataTable
			columns={columns}
			data={data}
			fixedHeader
			customStyles={customStyple}
			highlightOnHover
			pagination
		/>
	)
}

export default TableViewdailpick