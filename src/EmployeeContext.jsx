import React, { createContext, useState, useContext } from 'react';

const EmployeeContext = createContext();

const fakedata = [
    {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 1
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 2
    },
    {
        firstName: "John",
        lastName: "Smith",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 3
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 4
    },
    {
        firstName: "John",
        lastName: "Jones",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 5
    },
    {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 6
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 7
    },
    {
        firstName: "John",
        lastName: "Smith",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 8
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 9
    },
    {
        firstName: "John",
        lastName: "Jones",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 10
    },
    {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id:11
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 12
    },
    {
        firstName: "John",
        lastName: "Smith",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 13
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id: 14
    },
    {
        firstName: "John",
        lastName: "Jones",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering",
        id : 15
    }
   
];

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState(fakedata);


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
