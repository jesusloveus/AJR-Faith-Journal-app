import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';

const JournalHistory = () =>
{
    const [ history, setHistory ] = useState( [] );
    const [ editingIndex, setEditingIndex ] = useState( null );

    // Load from localStorage when component mounts
    useEffect( () =>
    {
        const saved = JSON.parse( localStorage.getItem( 'journalEntries' ) ) || [];
        setHistory( saved );
    }, [] );

    // Save back to localStorage on change
    useEffect( () =>
    {
        localStorage.setItem( 'journalEntries', JSON.stringify( history ) );
    }, [ history ] );

    const deleteEntry = ( index ) =>
    {
        const updated = [ ...history ];
        updated.splice( index, 1 );
        setHistory( updated );
    };

    const saveEdit = ( updatedText ) =>
    {
        const updated = [ ...history ];
        updated[ editingIndex ].text = updatedText;
        setHistory( updated );
        setEditingIndex( null );
    };

    return (
        <div className="page">
            <h2>Journal History</h2>
            { history.length === 0 ? (
                <p>No journal entries found.</p>
            ) : (
                <ul>
                    { history.map( ( entry, i ) => (
                        <li key={ i } className="entry-card">
                            <strong>{ entry.date }</strong>
                            <p>{ entry.text }</p>
                            <button onClick={ () => setEditingIndex( i ) }>Edit</button>
                            <button onClick={ () => deleteEntry( i ) }>Delete</button>
                        </li>
                    ) ) }
                </ul>
            ) }

            { editingIndex !== null && (
                <EditModal
                    initialText={ history[ editingIndex ].text }
                    onSave={ saveEdit }
                    onCancel={ () => setEditingIndex( null ) }
                />
            ) }
        </div>
    );
};

export default JournalHistory;
