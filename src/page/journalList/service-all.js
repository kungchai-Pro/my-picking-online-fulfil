import axios from 'axios';
import { urlcall } from '../config';

// show online journal by saleorder ID
export async function getJournalBySaleOrder(saleOrderId) {

  return axios.get(urlcall.url_sql + `pk-getOnlinejournalBysaleorder/${saleOrderId}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

// show orderhaeder by saleorder ID
export async function getHeaderBySaleOrder(saleOrderId) {

  return axios.get(urlcall.url_sql + `pk-getorderheadBysaleorder/${saleOrderId}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

// show orderline by ordernunber
export async function getOrderlineByOrderNumber(NumberId) {

  return axios.get(urlcall.url_sql + `pk-getOrderlineByOrderNumber/${NumberId}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}


// show invent all  
export async function getlistInventAll() {

  return axios.get(urlcall.url_sql + `pk-getinventAll`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}


// uploade invent 
export async function getInventListUpdate() {

  return axios.post(urlcall.url_sql + `pk-createinventtable`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

//1. upload journal list
export async function getJournalListUpload() {

  return axios.get(urlcall.url_sql + `pk-uploadOnlinejournalAll`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

//2. upload header journal list
export async function getheaderJouranlUpload() {

  return axios.get(urlcall.url_sql + `pk-uploadheaderAll`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

//3. upload orderjouranlline journal list
export async function getlineOrderUpload() {

  return axios.get(urlcall.url_sql + `pk-updateOrderlineAll`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function UpdateInventImageById(values) {

  var urlImage = `${urlcall.url_sql_call}images/files/${values.namefile}`;

  return axios.put(urlcall.url_sql_call + `OnlineJournal/pk-InventImageById/${values.Id}`, { namefile: urlImage })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}


// update file 
export function UploadFiles(file) {
  
  const fd = new FormData();
  var newFileName = `${Date.now()}`+file.name;
  fd.append('file', file, newFileName);

  return fetch(urlcall.url_sql_call + `images/uploadfile`, {
    method: 'POST',
    body: fd
  }).then(res => res.json())
    .then(json => { return json })
    .catch(err => console.log(err));

}

// เรียกข้อมูลทั้งหมดของ OrderJournal status all
export async function getJournalAllStatus() {

  return axios.get(urlcall.url_sql + `pk-getAll`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

// update ,itemname ,barcode  item invent 21.07.2025
export async function UPdateInventByid(ids,data) {

  return axios.put(urlcall.url_sql + `pk-UpdateInventById/${ids}`, { ItemName:data.ItemName, Barcode:data.Barcode})
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

// เรียกดู invent by id
export async function getInventItemByid(id) {

  return axios.get(urlcall.url_sql + `pk-getinventById/${id}`)
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}


//เรียกสถานะที่ เสร็จแล้วทั้งหมด
export async function getJournalStatusComplete() {

  return axios.get(urlcall.url_sql + `pk-getComplete`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}
//เรียกสถานะที่ ยังไม่เสร็จทั้งหมด
export async function getJournalStatusNotComplete() {

  return axios.get(urlcall.url_sql + `pk-getNotComplete`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

//get Onlinejournal By date 
export async function getOnlinejournallist(getdate) {

  return axios.get(urlcall.url_sql + `pk-getOnlinejournalBydate/${getdate}`)
    .then(function (response) {
      // console.log(response)
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

// get comfirm order  by date

export function getOrderjournalconfirmlist(dateStart, dateEnd) {

  var object = {
    sdate: dateStart,
    edate: dateEnd
  }

  return axios.post(urlcall.url_sql + `pk-getcomfirmBydate`, object)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

// get comfirm order  by date

export function getTransactionByDateload(dateStart, dateEnd) {

  var object = {
    sdate: dateStart,
    edate: dateEnd
  }

  return axios.post(urlcall.url_sql + `Pk_getorderlineBydateload`, object)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

// get comfirm by invoic date 
export function getTransactionByinvoicedate(dateStart, dateEnd) {

  var object = {
    sdate: dateStart,
    edate: dateEnd
  }

  return axios.post(urlcall.url_sql + `pk_getOrderlineByinvoicdate`, object)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

//get journal By date Uploade
export async function journalByUploade() {

  return axios.get(urlcall.user_erp + "getOnlineJournal")
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

// delete journal all 
export async function removejournalall(id) {
    return axios.delete(urlcall.url_sql+`pk-removeall/${id}`).then(function (response){
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}
