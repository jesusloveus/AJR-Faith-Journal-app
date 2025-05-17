import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AuthLayout from "./AuthLayout";

const Login = () =>
{
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ error, setError ] = useState( "" );

    const handleLogin = async ( e ) =>
    {
        e.preventDefault();
        try
        {
            await signInWithEmailAndPassword( auth, email, password );
            alert( "Logged in successfully!" );
        } catch ( err )
        {
            setError( err.message );
        }
    };

    return (
        <AuthLayout>
            <form
                onSubmit={ handleLogin }
                style={ {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "30px",
                    borderRadius: "10px",
                    width: "300px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                } }
            >
                <h2 style={ { textAlign: "center", marginBottom: "20px" } }>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={ ( e ) => setEmail( e.target.value ) }
                    required
                    style={ { width: "100%", padding: "10px", marginBottom: "10px" } }
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={ ( e ) => setPassword( e.target.value ) }
                    required
                    style={ { width: "100%", padding: "10px", marginBottom: "10px" } }
                />
                <button
                    type="submit"
                    style={ {
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    } }
                >
                    Login
                </button>
                { error && <p style={ { color: "red", marginTop: "10px" } }>{ error }</p> }
            </form>
        </AuthLayout>
    );
};

export default Login;
