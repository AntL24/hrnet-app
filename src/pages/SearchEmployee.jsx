import React, { useState } from 'react';
import Header from '../layout/header';
import EmployeeList from '../EmployeeList';

const SearchEmployeePage = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
    };
    return (
                <EmployeeList onEmployeeClick={handleEmployeeClick} />
    );
};

export default SearchEmployeePage;
