import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';

const GuestHomeSidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/" >Home</Link></li>
                <li><Link to="/guest-statistics">Results and Statistics</Link></li>
            </ul>
        </div>
    );
};

export default GuestHomeSidebar;