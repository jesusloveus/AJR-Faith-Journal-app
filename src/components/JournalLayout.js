import React from 'react';
import doveImage from '../assets/images/dove-bg.jpg';

const JournalLayout = ( { children } ) =>
{
    return (
        <div style={ {
            backgroundImage: `url(${ doveImage })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            padding: '20px'
        } }>
            { children }
        </div>
    );
};

export default JournalLayout;
