// UserGreeting.js

import React from 'react';

function InternHomePage({ internName }) {
    return (
        <div>
            {internName ? (
                <h1>Welcome, {internName}!</h1>
            ) : (
                <h1>Welcome!</h1>
            )}
        </div>
    );
}

export default InternHomePage;
