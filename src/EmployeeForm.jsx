import React, { useState } from 'react';
import { useEmployees } from './EmployeeContext';

function EmployeeForm({ onClose }) {
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        startDate: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        department: ""
    });

    const { employees, setEmployees } = useEmployees();

    const saveEmployee = () => {
        setEmployees(prevEmployees => [...prevEmployees, employee]);
        alert('Employee Created!');
        if (onClose) onClose();
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    return (
        <div>
            <h2>Create Employee</h2>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input type="date" id="dateOfBirth" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input type="date" id="startDate" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="street">Street</label>
                <input type="text" id="street" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="state">State</label>
                <input type="text" id="state" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input type="text" id="zipCode" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="department">Department</label>
                <input type="text" id="department" onChange={handleChange} />
            </div>
            <button onClick={saveEmployee}>Save</button>
        </div>
    );
}

export default EmployeeForm;
