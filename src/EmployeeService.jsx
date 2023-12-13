import { ref, set, get, update, remove, push, child, getDatabase } from "firebase/database";
import app from './firebaseConfig';

// Mock data for testing purposes
const mockData = [
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

// Initialize Firebase
const database = getDatabase(app);

// You may switch between mock and Firebase implementations by setting the VITE_USE_MOCK environment variable to true or false,
// and updating your own .env file accordingly.
const useMock = import.meta.env.VITE_USE_MOCK === 'true';

// Implement methods to fetch, create, update, and delete employees
const firebaseOperations = {
    fetchEmployees: async () => {
        const dbRef = ref(database, 'employees');
        try {
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    },
    createEmployee: async (employeeData) => {
        const employeesRef = ref(database, 'employees');
        try {
            const newEmployeeRef = push(employeesRef);
            await set(newEmployeeRef, employeeData);
            return { id: newEmployeeRef.key, ...employeeData };
        } catch (error) {
            console.error('Error creating employee:', error);
            throw error;
        }
    },
    updateEmployee: async (id, employeeData) => {
        try {
            const employeeRef = ref(database, 'employees/' + id);
            await update(employeeRef, employeeData);
            return employeeData;
        } catch (error) {
            console.error('Error updating employee:', error);
            throw error;
        }
    },
    deleteEmployee: async (id) => {
        try {
            const employeeRef = ref(database, 'employees/' + id);
            await remove(employeeRef);
            return { id };
        } catch (error) {
            console.error('Error deleting employee:', error);
            throw error;
        }
    },
};

// Implementations with mock data (for testing purposes)
const mockOperations = {
    fetchEmployees: async () => {
        return mockData;
    },
    createEmployee: async (employeeData) => {
        const newId = mockData.length + 1;
        const newEmployee = { ...employeeData, id: newId };
        mockData.push(newEmployee);
        return newEmployee;
    },
    updateEmployee: async (id, employeeData) => {
        const index = mockData.findIndex(emp => emp.id === id);
        mockData[index] = employeeData;
        return employeeData;
    },
    deleteEmployee: async (id) => {
        const index = mockData.findIndex(emp => emp.id === id);
        mockData.splice(index, 1);
        return { id };
    },
};

// Depending on the value of useMock, we assign the appropriate object to dataOperations
const dataOperations = useMock ? mockOperations : firebaseOperations;


export default dataOperations;
