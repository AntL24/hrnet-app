import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { EmployeeProvider } from './EmployeeContext';
import SearchEmployee from './pages/SearchEmployee';
import CreateEmployee from './pages/CreateEmployee';
import Header from './layout/header';
import './styles.css';


function App1() {
    let location = useLocation();
    const onSearchPage = location.pathname === '/';

    //Two routes:
    //home page on / which allows user to search for employees
    //create page on /create which allows user to create a new employee
    return (
        <EmployeeProvider>
            <Header onSearchPage={onSearchPage} />
                        <Routes location={location}>
                            <Route exact path="/" element={<SearchEmployee />} />
                            <Route path="/create" element={<CreateEmployee />} />
                        </Routes>
        </EmployeeProvider>
    );
}

//Router is wrapping here instead of App1 because of the useLocation hook
//useLocation requires the component to be wrapped in a Router
//and the Router needs to be the top level component as its nature is to wrap the entire app
export default function App() {
    return (
        <Router>
            <App1 />
        </Router>
    );
}
