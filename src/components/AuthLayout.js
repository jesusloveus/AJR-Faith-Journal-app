import React from 'react';
import './AuthLayout.css'; 
import crossImage from '../assets/images/cross.jpg';

const AuthLayout = ( { children } ) =>
{
    return (
        <div className="auth-layout" style={ {
            backgroundImage: `url(${ crossImage })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh'
        } }>
            { children }
        </div>
    );
};

export default AuthLayout;
