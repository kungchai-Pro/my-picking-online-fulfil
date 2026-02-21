import DataTable from 'react-data-table-component';
import ViewDetailpage from './viewDetailPage';
import AddnewitemPage from '../addnewitem.Page';
import Moment from 'moment';
import { FaCheckCircle,FaCircle } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

const columns = [
	{
		name: '# ',
		selector: row => "[-]",
		sortable: true,
		grow: 0.3,
	},
	{
		name: 'SalesOnline',
		selector: row => row.SaleSOlineId,
		sortable: true,
	},
	{
		name: 'Date',
		selector: row => <div>{Moment(row.Create_date ).format('DD/MM/YYYY')}</div>,
		sortable: true,
	},
	{
		name: 'Channel',
		selector: row => row.SaleChannel,
		sortable: true,
	},
	{
		name: 'Name',
		selector: row => row.CustName,
	},
	{
		name: 'Description',
		selector: row => row.Description,
	},
	{
		name: 'Order Total',
		selector: row => row.TotalOrder,
		sortable: true,
	},
	{
		name: 'Complete',
		selector: row => row.complete,
	},
	{
		name: 'Pending',
		selector: row =><div>{row.TotalOrder-row.complete}</div>,
	},
	{
		name: 'Status',
		grow: 0.3,
		selector: row =><di>{row.TotalOrder-row.complete==0?
		<div><center><FaCircle size={25} color='#08A12F'/></center></div>:
		<div><FaCircle size={25} color='#F75B29'/></div>}</di>,
		//conditionalCellStyles: [    
			// {
			// 	when: row => row.TotalOrder-row.complete == 0,
			// 	style: {
			// 		backgroundColor: 'rgba(63, 195, 128, 0.9)',
			// 		color: 'white',
			// 		'&:hover': {
			// 			cursor: 'pointer',
			// 		},
			// 	},
			// },
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
			// 	when: row => row.TotalOrder-row.complete > 0,
			// 	style: {
			// 		backgroundColor: 'rgba(242, 38, 19, 0.9)',
			// 		color: 'white',
			// 		'&:hover': {
			// 			cursor: 'not-allowed',
			// 		},
			// 	},
			// },
		//],
	},
	{
		name: 'Veiw',
		grow: 2.0,
		selector: row => <ViewDetailpage saleorderId={row.SaleSOlineId}/>,
	},
];


function Tablejournal({data}) {

	const customStyple={
	headRow: {
		style: {
			border: 'none',
			backgroundColor:'#28B463'
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
			customStyles={customStyple}
			highlightOnHover
			pagination
		/>
	);
};

export default Tablejournal