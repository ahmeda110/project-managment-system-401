import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../SideBar/Sidebar';

import "../../assets/styles/Account.css"

function Account() {


    return (
        <>
            <div className='account-container'>
                <Sidebar  />
                <div className='content-container'>Account</div>
            </div>
            
        </>
    )
}

export default Account