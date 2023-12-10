import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sidebar.css'

const InternHomeSidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/account">My Account</Link></li>
                <li><Link to="/results">My Results</Link></li>
            </ul>
        </div>
    );
};

export default InternHomeSidebar;
