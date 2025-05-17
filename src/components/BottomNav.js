// src/components/BottomNav.js
import React from 'react';
import { Link } from 'react-router-dom';

const BottomNav = () =>
{
    return (
        <nav style={ { position: 'fixed', bottom: 0, width: '100%', background: '#eee', padding: '10px' } }>
            <Link to="/">Home</Link> | <Link to="/journal">Journal</Link> | <Link to="/prayer">Prayer</Link> | <Link to="/about">About</Link>
        </nav>
    );
};

export default BottomNav;
