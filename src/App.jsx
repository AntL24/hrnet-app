import React from 'react';
import Home from './Home';
import './styles.css';
import { EmployeeProvider } from './EmployeeContext';

function App() {
    return (
        <EmployeeProvider>
            <div className="container">
                <Home />
            </div>
        </EmployeeProvider>
    );
}

export default App;
