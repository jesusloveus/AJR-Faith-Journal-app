// src/components/Home.js
import React, { useEffect, useState } from 'react';
import './Home.css';

const motivationalQuotes = [
    "You are capable of amazing things.",
    "God’s timing is perfect. Trust Him.",
    "Be still and know that He is God.",
    "Your breakthrough is coming.",
    "God’s grace is greater than your struggles.",
    "Walk by faith, not by sight.",
    "You were created on purpose for a purpose."
];

const Home = () =>
{
    const [ verse, setVerse ] = useState( null );
    const [ loading, setLoading ] = useState( true );
    const [ quote, setQuote ] = useState( '' );

    useEffect( () =>
    {
        const fetchVerse = async () =>
        {
            try
            {
                const cached = JSON.parse( localStorage.getItem( 'dailyVerse' ) );
                const today = new Date().toISOString().split( 'T' )[ 0 ];

                if ( cached && cached.date === today )
                {
                    setVerse( cached.verse );
                    setQuote( cached.quote ); // reuse cached quote
                } else
                {
                    const response = await fetch( 'https://beta.ourmanna.com/api/v1/get/?format=json' );
                    const data = await response.json();
                    const verseData = {
                        text: data.verse.details.text,
                        reference: data.verse.details.reference
                    };
                    const randomQuote = motivationalQuotes[ Math.floor( Math.random() * motivationalQuotes.length ) ];

                    setVerse( verseData );
                    setQuote( randomQuote );

                    localStorage.setItem(
                        'dailyVerse',
                        JSON.stringify( { date: today, verse: verseData, quote: randomQuote } )
                    );
                }
            } catch ( error )
            {
                console.error( 'Failed to fetch verse:', error );
            } finally
            {
                setLoading( false );
            }
        };

        fetchVerse();
    }, [] );

    return (
        <div className="page home-page">
            <h2>Welcome Back!</h2>
            <div className="verse-box">
                <h3>📖 Daily Bible Verse</h3>
                { loading ? (
                    <p>Loading...</p>
                ) : verse ? (
                    <>
                        <p><em>{ verse.text }</em></p>
                        <p><strong>{ verse.reference }</strong></p>
                        <hr />
                        <h4>✨ Motivational Thought</h4>
                        <p>{ quote }</p>
                    </>
                ) : (
                    <p>Could not load verse.</p>
                ) }
            </div>
        </div>
    );
};

export default Home;
