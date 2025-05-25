import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Journal from './components/Journal';
import Prayer from './components/Prayer';
import About from './components/About';
import BottomNav from './components/BottomNav';
import JournalHistory from './components/JournalHistory';
import PrayerHistory from './components/PrayerHistory';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import BibleStory from './components/BibleStoryTTS'; 

import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import crossImage from './assets/images/cross.jpg';
import doveImage from './assets/images/dove-bg.jpg';

function App ()
{
    const [ user ] = useAuthState( auth );
    const location = useLocation();

    const handleLogout = () =>
    {
        signOut( auth );
    };

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const backgroundImage = isAuthPage ? crossImage : doveImage;

    return (
        <div
            className="App"
            style={ {
                backgroundImage: `url(${ backgroundImage })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            } }
        >
            <header className="app-header">
                <h1>AJR Faith Journal</h1>
                <p>Your daily walk with God</p>
            </header>

            <nav className="top-nav">
                { user ? (
                    <>
                        <Link to="/home">Home</Link> |{ " " }
                        <Link to="/journal">Journal</Link> |{ " " }
                        <Link to="/journal-history">Journal History</Link> |{ " " }
                        <Link to="/prayer">Prayer</Link> |{ " " }
                        <Link to="/prayer-history">Prayer History</Link> |{ " " }
                        <Link to="/bible-story">Bible Story</Link> |{ " " } {/* ✅ NEW NAV LINK */ }
                        <Link to="/about">About</Link> |{ " " }
                        <button onClick={ handleLogout }>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link> |{ " " }
                        <Link to="/signup">Signup</Link>
                    </>
                ) }
            </nav>

            <Routes>
                <Route path="/" element={ <Navigate to="/login" /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/signup" element={ <Signup /> } />

                <Route path="/home" element={ <ProtectedRoute><Home /></ProtectedRoute> } />
                <Route path="/journal" element={ <ProtectedRoute><Journal /></ProtectedRoute> } />
                <Route path="/journal-history" element={ <ProtectedRoute><JournalHistory /></ProtectedRoute> } />
                <Route path="/prayer" element={ <ProtectedRoute><Prayer /></ProtectedRoute> } />
                <Route path="/prayer-history" element={ <ProtectedRoute><PrayerHistory /></ProtectedRoute> } />
                <Route path="/about" element={ <ProtectedRoute><About /></ProtectedRoute> } />

                {/* NEW BIBLE STORY ROUTE */ }
                <Route path="/bible-story" element={ <ProtectedRoute><BibleStory /></ProtectedRoute> } />
            </Routes>

            { user && <BottomNav /> }
        </div>
    );
}

export default App;
