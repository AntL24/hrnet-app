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
        <div className="container">
            <div className='form-group'>
                <div className='title'>
                    <h2>Create Employee</h2>
                </div>
                <div className="form-container">
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
                    <div className="address-group">
                        <span className="address-title">Address</span>
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
                            <select id="state" onChange={handleChange} value={employee.state}>
                                <option value="">Select State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="zipCode">Zip Code</label>
                            <input type="text" id="zipCode" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group-department-container">
                        <div className='form-group-department'>
                            <label htmlFor="department" className='department-label'>Department</label>
                            <select id="department" onChange={handleChange} value={employee.department}>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Legal">Legal</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={saveEmployee}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeForm;
