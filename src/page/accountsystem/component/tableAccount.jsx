import DataTable from 'react-data-table-component';
import Actionall from './actionall';
// import ViewDetailpage from './viewDetailPage';
const columns = [

	{
		name: 'ชื่อผู้ใช้งาน',
		selector: row => row.name,
		sortable: true,
	},
	{
		name: 'ชือเข้าใช้งานระบบ',
		selector: row => row.username,
		sortable: true,
	},
	{
		name: 'รหัสพนักงาน',
		selector: row => row.employeeId,
		sortable: true,
	},
	{
		name: 'รหัสแผนก',
		selector: row => row.departmentId,

	},
	{
		name: 'กำหนดสิทธิ์',
		selector: row => row.roles,
	},
	{
		name: 'เปิดใช้งาน',
		selector: row => <div>{row.isActive==1?"เปิดใช้งาน":"ปิดใช้งาน"}</div>,
	},
    {
		name: 'ACTION',
		grow:1.5,
		selector: row => <div>
            <Actionall AcId={row.acId}/>
        </div>,
	},

];

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

function TableAccount({data}) {
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

export default TableAccount