import React from 'react';

function editEmployee() {
    //edit info in the form
}

function deleteEmployee() {
    //remove from state
}


function EmployeeDetails({ employee }) {
    if (!employee) return null;

    return (
    <div className="employee-info">
        <div className="employee-details">
            <h3>Manage employee</h3>
            <h4>{employee.firstName} {employee.lastName}</h4>
            <p>Date of Birth: {employee.dateOfBirth}</p>
            <p>Start Date: {employee.startDate}</p>
            <p>Street: {employee.street}</p>
            <p>City: {employee.city}</p>
            <p>State: {employee.state}</p>
            <p>Zip Code: {employee.zipCode}</p>
            <p>Department: {employee.department}</p>
        </div>
        <div className="employee-actions">
            <button onClick={editEmployee}>Edit</button>
            <button onClick={deleteEmployee}>Delete</button>
        </div>
    </div>

    );
}

export default EmployeeDetails;
