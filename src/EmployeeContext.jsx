import React, { createContext, useState, useContext, useEffect } from 'react';
import dataOperations from './EmployeeService';
export const EmployeeContext = createContext();

//Context is used to manage state across components without having to pass props down through every component in the tree.
export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

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

export const useEmployees = () => {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployees must be used within an EmployeeProvider');
    }
    return context;
};