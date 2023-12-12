import { useState, useEffect } from 'react';
import { fetchInternByEmail } from '../services/Api';
import { getEmailFromToken } from '../services/AuthService';

const GetLoggedinIntern = () => {
    const [intern, setIntern] = useState(null);

    useEffect(() => {
        const email = getEmailFromToken();
        if (email) {
            fetchInternByEmail(email)
                .then(intern => {
                    setIntern(intern);
                })
                .catch(error => {
                    console.error('Error fetching intern details:', error);
                    setIntern(null);
                });
        }
    }, []);

    return intern;
};

export default GetLoggedinIntern;
