import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../SideBar/Sidebar';

import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";

import "../../assets/styles/Dashboard.css"

function Dashboard() {
    // SAMPLE POST REQUEST TO THE BACKEND
    // const [displayTest, setDisplayTest] = useState("k");

    // useEffect(() => {
    //     axios.post("http://localhost:3100/api/dashboard", {})
    //         .then(result => {
    //             console.log(result);
    //             setDisplayTest(result.data); // Note: Accessing result.data
    //         })
    //         .catch(err => console.error(err));  
    // }, []);

    const sampleTasks = [
        {title: "Dentist Appointment", description: "Scgeduele a 6-month check-up with the dentist", due: "25/10/25", status: true},
        {title: "Dentist Appointment", description: "Scgeduele a 6-month check-up with the dentist", due: "25/10/25", status: false},
        {title: "Dentist Appointment", description: "Scgeduele a 6-month check-up with the dentist", due: "25/10/25", status: true},
        {title: "Dentist Appointment", description: "Scgeduele a 6-month check-up with the dentist", due: "25/10/25", status: false},
        {title: "Dentist Appointment", description: "Scgeduele a 6-month check-up with the dentist", due: "25/10/25", status: true},
    ]

    return (
        <>
            <div className='dashbaord-container'>
                <Sidebar className="sidebar-container" />
                <div className='content-container'>
                    <div className='content-header'>
                        <div className='title'>All Tasks</div>
                        <AiFillPlusCircle size={40} style={{ cursor: "pointer" }}/>
                    </div>
                    <div className='tasks-container'>
                        {sampleTasks.map((val) => (
                            <div className='card'>
                                <div className='title'>{val.title}</div>
                                <div className='description'>{val.description}</div>
                                <div className='date'>{val.due}</div>
                                <div className='card-action-section'>
                                    <div className='status' style={{ background: val.status ? 'limegreen' : 'red'}}>
                                        {val.status ? "Completed" : "Incomplete"}
                                    </div>
                                    <div style={{ display: "flex", columnGap: ".5em", cursor: "pointer" }}>
                                        <MdEditDocument size={26}/>
                                        <RiDeleteBin2Fill size={26}/>
                                    </div>
                                </div>
                            </div>
                        ))

                        }
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Dashboard