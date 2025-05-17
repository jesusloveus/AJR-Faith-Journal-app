import React, { useEffect, useState } from 'react';
import './Login.css';



const JournalHistory = () =>
{
    const [ entries, setEntries ] = useState( [] );

    useEffect( () =>
    {
        const savedEntries = JSON.parse( localStorage.getItem( 'journalEntries' ) ) || [];
        setEntries( savedEntries );
    }, [] );

    const handleDelete = ( index ) =>
    {
        const updated = entries.filter( ( _, i ) => i !== index );
        setEntries( updated );
        localStorage.setItem( 'journalEntries', JSON.stringify( updated ) );
    };

    const handleEdit = ( index ) =>
    {
        const newText = prompt( "Edit your journal entry:", entries[ index ].text );
        if ( newText !== null && newText.trim() !== '' )
        {
            const updated = [ ...entries ];
            updated[ index ].text = newText;
            setEntries( updated );
            localStorage.setItem( 'journalEntries', JSON.stringify( updated ) );
        }
    };

    return (
        <div className="page">
            <h3>Past Journal Entries</h3>
            { entries.length === 0 ? (
                <p>No past journal entries found.</p>
            ) : (
                entries.map( ( entry, index ) => (
                    <div key={ index } className="entry-card">
                        <strong>{ entry.date }</strong>
                        <p>{ entry.text }</p>
                        <button onClick={ () => handleEdit( index ) }>Edit</button>
                        <button onClick={ () => handleDelete( index ) }>Delete</button>
                    </div>
                ) )
            ) }
        </div>
    );
};

export default JournalHistory;
