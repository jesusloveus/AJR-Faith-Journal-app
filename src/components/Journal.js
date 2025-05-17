// src/components/Journal.js
import React, { useState, useEffect } from 'react';
import './Journal.css';
import EditModal from './EditModal';
import BibleStoryTTS from './BibleStoryTTS';
import './BibleStoryTTS.css';
const Journal = () =>
{
    const [ entry, setEntry ] = useState( '' );
    const [ entries, setEntries ] = useState( [] );
    const [ editingIndex, setEditingIndex ] = useState( null );
    const [ showEditModal, setShowEditModal ] = useState( false );
    const [ selectedEntry, setSelectedEntry ] = useState( null );

    useEffect( () =>
    {
        const savedEntries = JSON.parse( localStorage.getItem( 'journalEntries' ) ) || [];
        setEntries( savedEntries );
    }, [] );

    useEffect( () =>
    {
        localStorage.setItem( 'journalEntries', JSON.stringify( entries ) );
    }, [ entries ] );

    const handleAdd = () =>
    {
        if ( entry.trim() )
        {
            const newEntry = { text: entry, date: new Date().toLocaleDateString() };
            setEntries( [ newEntry, ...entries ] );
            setEntry( '' );
        }
    };

    const handleDelete = ( index ) =>
    {
        const updatedEntries = [ ...entries ];
        updatedEntries.splice( index, 1 );
        setEntries( updatedEntries );
    };

    const handleEdit = ( index ) =>
    {
        setEditingIndex( index );
        setSelectedEntry( entries[ index ] );
        setShowEditModal( true );
    };

    const handleSaveEdit = ( updatedEntry ) =>
    {
        const updatedEntries = [ ...entries ];
        updatedEntries[ editingIndex ] = updatedEntry;
        setEntries( updatedEntries );
        setShowEditModal( false );
        setEditingIndex( null );
        setSelectedEntry( null );
    };

    return (
        <div className="page">
            <div className="journal-form">
                <h3>Today's Reflection</h3>
                <label htmlFor="entry">Write your thoughts:</label>
                <textarea
                    id="entry"
                    value={ entry }
                    onChange={ ( e ) => setEntry( e.target.value ) }
                />
                <button onClick={ handleAdd }>Add Entry</button>
            </div>

            { entries.map( ( e, i ) => (
                <div key={ i } className="entry-card">
                    <strong>{ e.date }</strong>
                    <p>{ e.text }</p>
                    <button onClick={ () => handleEdit( i ) }>Edit</button>
                    <button onClick={ () => handleDelete( i ) }>Delete</button>
                </div>
            ) ) }

            { showEditModal && selectedEntry && (
                <EditModal
                    entry={ selectedEntry }
                    onSave={ handleSaveEdit }
                    onClose={ () => setShowEditModal( false ) }
                />
            ) }

            {/* ✅ Bible Story TTS Section */ }
            <div className="bible-story-tts">
                <BibleStoryTTS />
            </div>
        </div>
    );
};

export default Journal;
