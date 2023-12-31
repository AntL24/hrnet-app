import React, { createContext, useState, useContext, useEffect } from 'react';
import dataOperations from './services/EmployeeService';

//Both EmployeeContext and useEmployees are used in this project to manage state, for training purposes.
//It would be better to be consistent and use one or the other, in a real project.

//Context is used to manage state across components without having to pass props down through every component in the tree.
export const EmployeeContext = createContext();

//The provider component is used to wrap the components that need access to the context
export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    //Fetches employees from the database on component mount
    useEffect(() => {
        const loadEmployees = async () => {
            const employeesData = await dataOperations.fetchEmployees();
            // Converts the object into an array to be used by the react table package
            if (typeof employeesData === 'object' && employeesData !== null) {
                const employeesArray = Object.keys(employeesData).map(key => ({
                    id: key,
                    ...employeesData[key]
                }));
                setEmployees(employeesArray);
            } else {
                // Employee data already in array format              
                setEmployees(employeesData);
            }
        };
        loadEmployees();
    }, []);
    

    return (
        <EmployeeContext.Provider value={{ employees, setEmployees }}>
            {children}
        </EmployeeContext.Provider>
    );
};

//Custom hook to use the context in other components
export const useEmployees = () => {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployees must be used within an EmployeeProvider');
    }
    return context;
};