import React, { useState } from 'react';
import EmployeeDetails from './EmployeeDetails';
import { useEmployees } from './EmployeeContext';
import ReactDataTable from './ReactDataTable/ReactDataTable';

function EmployeeList({ openModal }) {
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

    const handleRowClick = (employee) => {
        setSelectedEmployee(employee);
    }

    return (
        <div className="container">
            <div className='employee-list-container'>
                <h2>Current Employees</h2>
                <ReactDataTable 
                    data={employees}
                    columns={columns}
                    onRowClick={handleRowClick}
                    openModal={openModal}
                    defaultEntriesPerPage={10}
                    sortColumn="firstName"
                />
            </div>
            {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
            {!selectedEmployee && <EmployeeDetails />}
        </div>
    );
}

export default EmployeeList;
