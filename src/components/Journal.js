import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';

const Journal = () =>
{
    const [ entries, setEntries ] = useState( [] );
    const [ newEntry, setNewEntry ] = useState( '' );
    const [ editingIndex, setEditingIndex ] = useState( null );

    // Load from localStorage when component mounts
    useEffect( () =>
    {
        const saved = JSON.parse( localStorage.getItem( 'journalEntries' ) ) || [];
        setEntries( saved );
    }, [] );

    // Save to localStorage whenever entries change
    useEffect( () =>
    {
        localStorage.setItem( 'journalEntries', JSON.stringify( entries ) );
    }, [ entries ] );

    const addEntry = () =>
    {
        if ( newEntry.trim() )
        {
            const entry = {
                text: newEntry,
                date: new Date().toLocaleDateString()
            };
            setEntries( [ entry, ...entries ] );
            setNewEntry( '' );
        }
    };

    const deleteEntry = ( index ) =>
    {
        const updated = [ ...entries ];
        updated.splice( index, 1 );
        setEntries( updated );
    };

    const saveEdit = ( updatedText ) =>
    {
        const updated = [ ...entries ];
        updated[ editingIndex ].text = updatedText;
        setEntries( updated );
        setEditingIndex( null );
    };

    return (
        <div className="page">
            <h2>Journal</h2>
            <textarea
                value={ newEntry }
                onChange={ ( e ) => setNewEntry( e.target.value ) }
                placeholder="Write your journal entry..."
            />
            <button onClick={ addEntry }>Add Entry</button>

            <ul>
                { entries.map( ( entry, i ) => (
                    <li key={ i } className="entry-card">
                        <strong>{ entry.date }</strong>
                        <p>{ entry.text }</p>
                        <button onClick={ () => setEditingIndex( i ) }>Edit</button>
                        <button onClick={ () => deleteEntry( i ) }>Delete</button>
                    </li>
                ) ) }
            </ul>

            { editingIndex !== null && (
                <EditModal
                    initialText={ entries[ editingIndex ].text }
                    onSave={ saveEdit }
                    onCancel={ () => setEditingIndex( null ) }
                />
            ) }
        </div>
    );
};

export default Journal;
