import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { FaFileImage } from "react-icons/fa";
import Uploadfile from './uploadfile';
import UpdateInvent from './updateInvent';
import { urlcall } from '../../config';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function ViewImage({ imagesID, ItemName }) {

	const [lgShow, setLgShow] = useState(false);

	return (
		<div>

			<div onClick={() => setLgShow(true)}>
				<a href='#'><img src={imagesID} width="40" height="40" /></a>
			</div>
			<Modal
				size="lg"
				show={lgShow}
				onHide={() => setLgShow(false)}
				aria-labelledby="example-modal-sizes-title-lg"
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						Veiw Item
					</Modal.Title>
				</Modal.Header>
				<Modal.Body >
					<center>
						<div style={{ width: '100%', height: '100%' }}>
							<img src={imagesID} width="100%" height="auto" />

						</div>
						<div>ITEM NAME : {ItemName}</div>
					</center>
				</Modal.Body>
			</Modal>
		</div>
	)
}


function TableInvent({ data, loadDataInvent }) {

	const columns = [
		{
			name: 'Item Id',
			grow: 0.5,
			selector: row => row.ItemId,
			sortable: true,
		},
		{
			name: 'Item Name',
			grow: 2.5,
			selector: row => row.ItemName,
			sortable: true,
		},
		{
			name: 'Barcode',
			selector: row => row.Barcode,
			sortable: true,
		},
		{
			name: 'Image',
			selector: row => <div> {row.Image !== "" ? <ViewImage imagesID={row.Image} ItemName={row.ItemName} /> : <div><FaFileImage size={40} /></div>} </div>,
		},
		{
			name: 'Action',
			selector: row =>
				<div style={{ flexDirection: 'row', display: 'flex' }}>
					<div style={{marginRight:5}}><Uploadfile Id={row.InventId} ItemId={row.ItemId} loadDataInvent={loadDataInvent} /></div>
					<div><UpdateInvent Id={row.InventId} loadDataInvent={loadDataInvent}/></div>
				</div>
			,
		},
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
				// backgroundColor: '#FDDCB1',
				color: '#F76826',
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
		<DataTable
			columns={columns}
			data={data}
			customStyles={customStyple}
			conditionalRowStyles={conditionalRowStyles}
			highlightOnHover
			pagination
		/>
	)
}

export default TableInvent