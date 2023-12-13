import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';

const InternHomeSidebar = () => {
    const intern = GetLoggedinIntern();

    return (
        <div className="sidebar">
            <ul>
                <li className="title">{intern ? intern.name : ''}</li>
                <li><Link to="/account-settings">Account settings</Link></li>
                <li><Link to="/intern-home">Available Assessments</Link></li>
                <li><Link to="/assessments">Completed Assessments</Link></li>
                <li><Link to="/results">Results</Link></li>
            </ul>
        </div>
    );
};

export default InternHomeSidebar;
