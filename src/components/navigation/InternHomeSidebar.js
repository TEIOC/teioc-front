import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchInternByEmail} from "../../services/Api";
import {getEmailFromToken} from "../../services/AuthService";
import '../../styles/sidebar.css'

const InternHomeSidebar = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        const email = getEmailFromToken();
        if (email) {
            fetchInternByEmail(email).then(intern=> {
                setName(intern.name);
            });
        }
    }, []);

    return (
        <div className="sidebar">
            <ul>
                <li className="title">{name}</li>
                <li><Link to="/intern-home">Home</Link></li>
                <li><Link to="/account">My Account</Link></li>
                <li><Link to="/results">My Results</Link></li>
            </ul>
        </div>
    );
};

export default InternHomeSidebar;
