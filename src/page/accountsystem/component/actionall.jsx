import React, { useState, useEffect } from 'react';
import Repassword from './repassword';
import UpdateAccount from './updateAccount';
import DeleteAccount from './deleteAccount';


function Actionall({ AcId }) {
    return (
        <div className='row-page'>
            <Repassword AcId={AcId} />
            <UpdateAccount AcId={AcId} />
            {/* <DeleteAccount AcId={AcId} /> */}
        </div>
    )
}

export default Actionall