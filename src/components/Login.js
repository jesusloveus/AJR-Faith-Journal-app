// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
import './Login.css';

const Login = () =>
{
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ error, setError ] = useState( '' );
    const navigate = useNavigate();

    const handleLogin = async ( e ) =>
    {
        e.preventDefault();
        try
        {
            await signInWithEmailAndPassword( auth, email, password );
            navigate( '/home' ); // Redirect to home page code here
        } catch ( err )
        {
            setError( 'Invalid email or password' );
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={ handleLogin }>
                <input
                    type="email"
                    placeholder="Email"
                    value={ email }
                    onChange={ ( e ) => setEmail( e.target.value ) }
                    required
                /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={ password }
                    onChange={ ( e ) => setPassword( e.target.value ) }
                    required
                /><br />
                <button type="submit">Login</button>
                { error && <p style={ { color: 'red' } }>{ error }</p> }
            </form>
        </div>
    );
};

export default Login;
