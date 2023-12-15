import React, { useState } from 'react';
import EmployeeList from './EmployeeList';
import Logo from '/src/assets/Logo_Hrnet.svg';

//Default homepage.
//Contains the employee list component, in the same way the old homepage did.
function Home() {
    return (
        <div className="home-container">
            <div className="header">
                <img src={Logo} alt="HRnet Logo" className="logo" />
                <h1>Employee Management</h1>
                <div className="back-home">
                    <a href="/">Home</a>
                </div>
            </div>

            <div className="content">
                <EmployeeList />
            </div>

        </div>
    );
}

export default Home;
