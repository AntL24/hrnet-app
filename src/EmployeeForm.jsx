import React, { useState } from 'react';
import { useEmployees } from './EmployeeContext';
import dataOperations from './services/EmployeeService';
import AddIcon from '/src/assets/add-icon.svg';

function EmployeeForm() {
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

    //Used by the validate function to store error messages for each field in the form
    //Messages are then displayed to the user if the form is not filled out correctly
    const [errors, setErrors] = useState({});

    //Validate stocks the errors object with error messages if the form is not filled out correctly
    //On the contrary, if the form is filled out correctly, the errors object is empty and validate returns true
    //Is used in the saveEmployee function to determine if the new employee object should be sent to the database
    const validate = () => {
        let tempErrors = {};
        tempErrors.firstName = employee.firstName ? "" : "First name is required";
        tempErrors.lastName = employee.lastName ? "" : "Last name is required";
        tempErrors.dateOfBirth = employee.dateOfBirth ? "" : "Date of birth is required";
        tempErrors.startDate = employee.startDate ? "" : "Start date is required";
        tempErrors.street = employee.street ? "" : "Street is required";
        tempErrors.city = employee.city ? "" : "City is required";
        tempErrors.state = employee.state ? "" : "State is required";
        tempErrors.zipCode = employee.zipCode ? "" : "Zip code is required";
        tempErrors.department = employee.department ? "" : "Department is required";
        //zip code validation
        if (employee.zipCode) {
            const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
            tempErrors.zipCode = zipCodeRegex.test(employee.zipCode) ? "" : "Zip code is invalid";
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === ""); // returns true only if all values in tempErrors are empty strings, meaning there are no errors
    };

    //Get the employee list from the context
    //is used to update the employee list after a new employee is added
    const { employees, setEmployees } = useEmployees();

    //When the form is correct, the employee object is sent to the database and the employee list is updated
    const saveEmployee = async () => {
        if (validate()) {
            try {
                const newEmployee = await dataOperations.createEmployee(employee);
                setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
                alert(`${newEmployee.firstName} ${newEmployee.lastName} has been added to the employee list!`);
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.error('Validation failed');
        }
    };

    // Updates the employee object as the user types in the form
    const handleChange = (e) => {
        const { id, value } = e.target;
        //take the previous state and merge it with the new state 
        setEmployee(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    return (
        <div className="container">
            <div className='form-group'>
                <div className='title'>
                    <img src={AddIcon} alt="Add Icon" className="add-icon-form" />                    
                    <h2>Create Employee</h2>
                </div>
                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={handleChange} />
                        <div className={`error-message ${errors.firstName ? "active" : ""}`}>
                            {errors.firstName}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={handleChange} />
                        <div className={`error-message ${errors.lastName ? "active" : ""}`}>
                            {errors.lastName}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input type="date" id="dateOfBirth" onChange={handleChange} />
                        <div className={`error-message ${errors.dateOfBirth ? "active" : ""}`}>
                            {errors.dateOfBirth}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input type="date" id="startDate" onChange={handleChange} />
                        <div className={`error-message ${errors.startDate ? "active" : ""}`}>
                            {errors.startDate && <div className="error">{errors.startDate}</div>}
                        </div>
                    </div>
                    <div className="address-group">
                        <span className="address-title">Address</span>
                        <div className="form-group">
                            <label htmlFor="street">Street</label>
                            <input type="text" id="street" onChange={handleChange} />
                            <div className={`error-message ${errors.street ? "active" : ""}`}>
                                {errors.street && <div className="error">{errors.street}</div>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" onChange={handleChange} />
                            <div className={`error-message ${errors.city ? "active" : ""}`}>
                                {errors.city && <div className="error">{errors.city}</div>}
                            </div>
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
                            <div className={`error-message ${errors.state ? "active" : ""}`}>
                                {errors.state && <div className="error">{errors.state}</div>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="zipCode">Zip Code</label>
                            <input type="text" id="zipCode" onChange={handleChange} />
                            <div className={`error-message ${errors.zipCode ? "active" : ""}`}>
                                {errors.zipCode && <div className="error">{errors.zipCode}</div>}
                            </div>
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
                            <div className={`error-message ${errors.department ? "active" : ""}`}>
                                {errors.department && <div className="error">{errors.department}</div>}
                        </div>
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
