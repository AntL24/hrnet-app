import React, { useState, useEffect } from 'react';
import EmployeeDetails from './EmployeeDetails';
import { useEmployees } from './EmployeeContext';

function EmployeeList({ openModal }) {

    const { employees } = useEmployees();
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    const filteredEmployees = employees.filter(employee =>
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEmployees.length / entriesPerPage);
    const currentEntries = filteredEmployees.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

    const handleRowClick = (employee) => {
        setSelectedEmployee(employee);
    }

    return (
        <div className="container">
            <div className="employee-list">
                <h2>Current Employees</h2>
                <div className="employee-filter">
                    <label>Show entries:
                        <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </label>
                    <label className="search">Search:
                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </label>
                </div>
                <div className='employee-table-overflow-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Start Date</th>
                                <th>Department</th>
                                <th>Date of Birth</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntries.map((employee, index) => (
                                <tr key={index} onClick={() => handleRowClick(employee)}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.dateOfBirth}</td>
                                    <td>{employee.startDate}</td>
                                    <td>{employee.street}</td>
                                    <td>{employee.city}</td>
                                    <td>{employee.state}</td>
                                    <td>{employee.zipCode}</td>
                                    <td>{employee.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
                    {`Showing ${Math.min((currentPage - 1) * entriesPerPage + 1, filteredEmployees.length)} to ${Math.min(currentPage * entriesPerPage, filteredEmployees.length)} of ${filteredEmployees.length} entries`}
                    <button onClick={openModal} className='create-button'>Create</button> {/* Add this line */}
                </div>

            </div>
            {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
        </div>
    );
}

export default EmployeeList;
