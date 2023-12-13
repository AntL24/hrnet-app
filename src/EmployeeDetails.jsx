import React from 'react';
import ManageIcon from '/src/assets/manage-icon.svg';
import dataOperations from './EmployeeService';
import { useContext } from 'react';
import { EmployeeContext } from './EmployeeContext';

function EmployeeDetails({ employee }) {
    const { employees, setEmployees } = useContext(EmployeeContext);

    function editEmployee() {
        console.warn("Edit functionality not yet implemented!");
    }

    const deleteEmployee = async () => {
        if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
            try {
                await dataOperations.deleteEmployee(employee.id);
                setEmployees(prevEmployees => prevEmployees.filter(e => e.id !== employee.id));
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    if (!employee) {
        return (
            <div className="employee-info">
                <div className='title'>
                    <img src={ManageIcon} alt="Manage Icon" className="manage-icon" />
                    <h3>Manage employee</h3>
                </div>
                <div className="employee-details">
                    <p>Select an employee to view their details</p>
                </div>
                <div className="employee-actions">
                    <button disabled>Edit</button>
                    <button disabled>Delete</button>
                </div>
            </div>
        );
    }

    const { firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department } = employee;

    return (
        <div className="employee-info">
            <div className='title'>
                <img src={ManageIcon} alt="Manage Icon" className="manage-icon" />
                <h3>Manage employee</h3>
            </div>
            <div className="employee-details-selected">
                <h4>{firstName} {lastName}</h4>
                <p>Date of Birth: {dateOfBirth}</p>
                <p>Start Date: {startDate}</p>
                <p>Street: {street}</p>
                <p>City: {city}</p>
                <p>State: {state}</p>
                <p>Zip Code: {zipCode}</p>
                <p>Department: {department}</p>
            </div>
            <div className="employee-actions">
                <button onClick={editEmployee}>Edit</button>
                <button onClick={deleteEmployee}>Delete</button>
            </div>
        </div>
    );
}

export default EmployeeDetails;
