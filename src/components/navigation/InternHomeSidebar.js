import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';
import GetLoggedinIntern from '../../hooks/GetLoggedinIntern';
import DefaultProfilePic from '../../styles/DefaultProfilePic.png';

const InternHomeSidebar = () => {
    const intern = GetLoggedinIntern();
   /*  const isActivated = intern ? intern.status : ''; */
    const id = intern ? intern.id : '';

    return (
        <div className="sidebar">
            <img src={DefaultProfilePic} alt="Profile" className="profile-pic" />
            <ul>
                <li className="title">{intern ? intern.name : ''}</li>
                <li><Link to="/account-settings">Account Settings</Link></li>
                <li><Link to="/assessments">All Assessments</Link></li>
                <li><Link to="/available-assessments">Available Assessments</Link></li>
                <li><Link to="/completed-assessments">Completed Assessments</Link></li>
                <li><Link to="/statistics">Results and statistics</Link></li>
                {/* {isActivated ? (
                    <li><Link to={`/deactivate/${id}`}>Deactivate my account</Link></li>
                ) : (
                    <li><Link to={`/activate/${id}`}>Activate my account</Link></li>
                )} */}
            </ul>
        </div>
    );
};

export default InternHomeSidebar;
