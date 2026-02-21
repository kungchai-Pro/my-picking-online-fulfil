import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { MdOutlineRateReview } from "react-icons/md";
import Card from 'react-bootstrap/Card';

function ViewImage({ imagesID,ItemName }) {

	const [lgShow, setLgShow] = useState(false);

	return (
		<div>

			<div onClick={() => setLgShow(true)}>
				<a href='#'><img src={imagesID}  width="100%" height={110} /></a>
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
				<Modal.Body>
					<center>
						<div style={{ width: '100%', height: '100%' }}>
							<img src={imagesID} style={{resizeMode: 'contain', width:"100%",height:'100%'}}/>
							
						</div>
						<div>ITEM NAME : { ItemName }</div>
					</center>
				</Modal.Body>
			</Modal>
		</div>
	)
}
export default ViewImage