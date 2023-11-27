import React, { useState } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
import EmployeeForm from './EmployeeForm';
import Logo from '/src/assets/Logo_Hrnet.svg';

function Home() {
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
    };

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
                <EmployeeList onEmployeeClick={handleEmployeeClick} openModal={openModal} />
            </div>

        </div>
    );
}

export default Home;
