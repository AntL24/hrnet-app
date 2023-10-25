import React, { useState } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
import EmployeeForm from './EmployeeForm';
import Modal from 'react-modal';
import Logo from '/src/assets/Logo_Hrnet.svg';

function Home() {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="home-container">
            <div className="header">
                <img src={Logo} alt="HRnet Logo" className="logo" />
                <h1>Employee Management</h1>
            </div>

            <div className="content">
                <EmployeeList onEmployeeClick={handleEmployeeClick} openModal={openModal} />
                <EmployeeDetails employee={selectedEmployee} />
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Create Employee Modal"
            >
                <EmployeeForm onClose={closeModal} />
            </Modal>

        </div>
    );
}

export default Home;
