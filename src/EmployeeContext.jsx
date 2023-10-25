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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
    },
    {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 egergererg St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering"
    },
    {
        firstName: "Jane",
        lastName: "Doergererge",
        dateOfBirth: "1990-01-01",
        startDate: "2020-01-01",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
        department: "Engineering"
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
