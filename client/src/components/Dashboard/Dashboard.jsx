import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [displayTest, setDisplayTest] = useState("k");

    useEffect(() => {
        axios.post("http://localhost:3100/api/dashboard", {})
            .then(result => {
                console.log(result);
                setDisplayTest(result.data); // Note: Accessing result.data
            })
            .catch(err => console.error(err));  
    }, []);

    return (
        <>
            {displayTest}
        </>
    )
}

export default Dashboard