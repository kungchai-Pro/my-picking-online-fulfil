import axios from 'axios';
import { urlcall } from '../config';
//journal
export async function getJournalBySaleOrder(saleOrderId) {

  return axios.get(urlcall.url_sql + `pk-getOnlinejournalBysaleorder/${saleOrderId}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

//header  get 
export async function getHeaderByOrderNumber(orderNumber) {

  return axios.post(urlcall.url_sql + `pk-getorderheadByordernumber`,{orderNumber:orderNumber})
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

export async function getOrderLineByOrderNumber(orderNumber) {

  return axios.get(urlcall.url_sql + `pk-getOrderlineByOrderNumber/${orderNumber}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

// update orderline กรณีที่ confirm order pick 
export  function updateOrderByid(Id, values,valueOrder,usernames) {
  // /v1/OnlineJournal/pk-updateLineOrderByid/:Id
  return axios.put(urlcall.url_sql + `pk-updateLineOrderByid/${Id}`, { ScanQty: values })
    .then(function (response) {
        // console.log(response)
      confirm_orderLine(valueOrder,usernames);
      return response.data

    })
    .catch(function (error) {
      console.log(error);
    });
}

// update ข้อมูล header ---- >
export  function updateOrderHeaderByid(Id, values, usernames, ImageBox) {

 return  axios.put(urlcall.url_sql + `pk-updateOrderheadById/${Id}`,
    {
      ScanQty: values,
      ImageBox: ImageBox,
      StatusPacking: "1",
      Userconfirm: usernames
    }
  )
    .then(function (response) {
      // console.log(response);
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

// insert data confirm orderline 

function confirm_orderLine(values, usernames) {

  var objecdata = {
    SaleOnlineId: values.OrderlineId,
    OrderNumber: values.OrderNumber,
    ItemOnlineSKU: values.ItemOnlineSKU,
    ItemId: values.ItemId,
    ItemName: values.ItemName,
    OrderQty: values.OrderQty,
    ScanQty: values.ScanQty,
    Barcode: values.Barcode,
    Userconfirm: usernames,
  }

   axios.post(urlcall.url_sql + 'pk-confirmOrderline', objecdata)
    .then(function (response) {
      
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
// update Status erp complete salesorder list

export async function UpdateStatusErpComplete(saleOrderId) {

  return axios.get(urlcall.url_sql + `pk-getCompleteStatus/${saleOrderId}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}


