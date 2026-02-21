import React from 'react'
import DataTable from 'react-data-table-component'
import Moment from 'moment';

const Tableconfirmorder = ({data}) => {

	// {Moment(journalOrder.TransDate).format('DD/MM/YYYY')}
	// Moment(DateNow).format('DD/MM/YYYY')
    const columns = [
        {
			name: 'SaleOrder',
			selector: row => row.SaleOrder,
			sortable: true,
		},
		{
			name: 'Date load',
			selector: row => row.DateLoad,
			sortable: true,
		},
		{
			name: 'Channel',
			selector: row => row.Channel,
			sortable: true,
		},
		{
			name: 'Name',
			selector: row => row.Name,
			sortable: true,
		},
		{
			name: 'Description',
			selector: row => row.Description,
			sortable: true,
		},
		{
			name: 'Billing Name',
			selector: row => row.BillingName,
			sortable: true,
		},
		{
			name: 'Billing Address',
			selector: row => row.BillingAddress,
			sortable: true,
		},
		{
			name: 'Telephone',
			selector: row => row.Telephone,
			sortable: true,
		},
		{
			name: 'Invoice Date',
			selector: row =>row.Invoicedate,
			grow: 1,
			sortable: true,
		},
		{
			name: 'Tricking Number',
			grow: 1.5,
			selector: row => row.Tricking,
			sortable: true,
		},
		{
			name: 'ItemOnlineSKU',
			grow: 2.5,
			selector: row => row.ItemOnlineSKU,
			sortable: true,
		},
		{
			name: 'ItemId',
			selector: row => row.ItemId,
			sortable: true,
		},
        {
			name: 'ItemName',
			selector: row => row.ItemName,
			sortable: true,
            grow: 1.5,
		},
        {
			name: 'OrderQty',
			selector: row => row.OrderQty,
			sortable: true,
		},
        {
			name: 'ScanQty',
			selector: row => row.ScanQty,
			sortable: true,
		},
        {
			name: 'Barcode',
			selector: row => row.Barcode,
			sortable: true,
		},
        {
			name: 'User Picking',
			selector: row => row.UserPicking,
			sortable: true,
		},
        {
			name: 'Date Scan',
			selector: row => row.DateScan,
			sortable: true,
		}
	];
	const customStyple = {
		headRow: {
			style: {
				border: 'none',
				backgroundColor: '#B6B4B4'
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

	const conditionalRowStyles = [
		{
			when: row => row.Image == "",
			style: {
				backgroundColor: '#FDDCB1',
				color: 'white',
				'&:hover': {
					cursor: 'pointer',
				},
			},
		},
		// {
		// 	when: row => row.calories >= 300 && row.calories < 400,
		// 	style: {
		// 		backgroundColor: 'rgba(248, 148, 6, 0.9)',
		// 		color: 'white',
		// 		'&:hover': {
		// 			cursor: 'pointer',
		// 		},
		// 	},
		// },
		// {
		// 	when: row => row.calories >= 400,
		// 	style: {
		// 		backgroundColor: 'rgba(242, 38, 19, 0.9)',
		// 		color: 'white',
		// 		'&:hover': {
		// 			cursor: 'not-allowed',
		// 		},
		// 	},
		// },
	];



  return (
    <div>
    <DataTable
    columns={columns}
    data={data}
    customStyles={customStyple}
    conditionalRowStyles={conditionalRowStyles}
    highlightOnHover
    pagination
/>
</div>
  )
}

export default Tableconfirmorder