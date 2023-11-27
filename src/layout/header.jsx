import Logo from '/src/assets/Logo_Hrnet.svg';
import ManageIcon from '/src/assets/manage-icon.svg';
import AddIcon from '/src/assets/add-icon.svg';
import { Link } from 'react-router-dom';

const Header = ({ onSearchPage }) => {
    return (
        <div className="header">
            <img src={Logo} alt="HRnet Logo" className="logo" />
            <h1>Employee Management</h1>
            <div className="navigation-button">
                {onSearchPage ? (
                    <Link to="/create" className="link-button">
                        <img src={AddIcon} alt="Add Icon" className="symbol add" /> Add new employee
                    </Link>
                ) : (
                    <Link to="/" className="link-button">
                        <img src={ManageIcon} alt="Manage Icon" className="symbol" /> Manage employees
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
