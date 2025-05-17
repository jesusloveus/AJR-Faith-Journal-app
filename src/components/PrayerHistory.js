import React, { useEffect, useState } from 'react';
import './Prayer.css';
import './Journal.css';


const PrayerHistory = () =>
{
    const [ requests, setRequests ] = useState( [] );

    useEffect( () =>
    {
        const saved = JSON.parse( localStorage.getItem( 'prayerRequests' ) ) || [];
        setRequests( saved );
    }, [] );

    const handleDelete = ( index ) =>
    {
        const updated = requests.filter( ( _, i ) => i !== index );
        setRequests( updated );
        localStorage.setItem( 'prayerRequests', JSON.stringify( updated ) );
    };

    const handleEdit = ( index ) =>
    {
        const newText = prompt( "Edit your prayer request:", requests[ index ].text );
        if ( newText !== null && newText.trim() !== '' )
        {
            const updated = [ ...requests ];
            updated[ index ].text = newText;
            setRequests( updated );
            localStorage.setItem( 'prayerRequests', JSON.stringify( updated ) );
        }
    };

    return (
        <div className="page">
            <h3>Past Prayer Requests</h3>
            { requests.length === 0 ? (
                <p>No past prayer requests found.</p>
            ) : (
                requests.map( ( request, index ) => (
                    <div key={ index } className="entry-card">
                        <strong>{ request.date }</strong>
                        <p>{ request.text }</p>
                        <button onClick={ () => handleEdit( index ) }>Edit</button>
                        <button onClick={ () => handleDelete( index ) }>Delete</button>
                    </div>
                ) )
            ) }
        </div>
    );
};

export default PrayerHistory;
