import React from 'react';

function EmployeeDetails({ employee }) {
    function editEmployee() {
        //TO DO LATER
        console.warn("Edit functionality not yet implemented!");
    }

    function deleteEmployee() {
        //TO DO LATER
        console.warn("Delete functionality not yet implemented!");
    }

    if (!employee) {
        return (
            <div className="employee-info">
                <div className='title'>
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
