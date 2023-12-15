import React, { useState, useEffect } from 'react';
import EmployeeDetails from './EmployeeDetails';
import ListIcon from '/src/assets/readme.svg';
import { useEmployees } from './EmployeeContext';
import { ReactDataTable } from 'quite-simple-reactdatatable';

function EmployeeList() {
    const { employees } = useEmployees();
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const columns = [
        { title: 'First Name', key: 'firstName' },
        { title: 'Last Name', key: 'lastName' },
        { title: 'Date of Birth', key: 'dateOfBirth' },
        { title: 'Start Date', key: 'startDate' },
        { title: 'Street', key: 'street' },
        { title: 'City', key: 'city' },
        { title: 'State', key: 'state' },
        { title: 'Zip Code', key: 'zipCode' },
        { title: 'Department', key: 'department' },
    ];

    //Event handler for row click to display employee details on click
    const handleRowClick = (employee) => {
        setSelectedEmployee(employee);
    }

    return (
        <div className="container">
            <div className='employee-list-container'>
                <div className='title'>
                    <img src={ListIcon} alt="List Icon" className="list-icon" />
                    <h2>Current Employees</h2>
                </div>
                {/* React DataTable npm package */}
                <ReactDataTable
                    data={employees}
                    columns={columns}
                    onRowClick={handleRowClick}//Prop to handle row click with function
                    defaultEntriesPerPage={10}
                    headerHeight="3rem"
                    tableBodyHeight="20rem"
                    paginationHeight="3rem"
                    fontFamily="'Roboto', sans-serif"
                />
            </div>
            {/* Display employee details if selected */}
            {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
            {!selectedEmployee && <EmployeeDetails />}
        </div>
    );
}

export default EmployeeList;