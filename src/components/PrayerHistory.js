import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';

const PrayerHistory = () =>
{
    const [ prayers, setPrayers ] = useState( [] );
    const [ editingIndex, setEditingIndex ] = useState( null );

    // Load prayers from localStorage
    useEffect( () =>
    {
        const saved = JSON.parse( localStorage.getItem( 'prayerEntries' ) ) || [];
        setPrayers( saved );
    }, [] );

    // Save to localStorage when prayers change
    useEffect( () =>
    {
        localStorage.setItem( 'prayerEntries', JSON.stringify( prayers ) );
    }, [ prayers ] );

    const deletePrayer = ( index ) =>
    {
        const updated = [ ...prayers ];
        updated.splice( index, 1 );
        setPrayers( updated );
    };

    const saveEdit = ( updatedText ) =>
    {
        const updated = [ ...prayers ];
        updated[ editingIndex ].text = updatedText;
        setPrayers( updated );
        setEditingIndex( null );
    };

    return (
        <div className="page">
            <h2>Prayer History</h2>
            { prayers.length === 0 ? (
                <p>No saved prayers yet.</p>
            ) : (
                <ul>
                    { prayers.map( ( entry, i ) => (
                        <li key={ i } className="entry-card">
                            <strong>{ entry.date }</strong>
                            <p>{ entry.text }</p>
                            <button onClick={ () => setEditingIndex( i ) }>Edit</button>
                            <button onClick={ () => deletePrayer( i ) }>Delete</button>
                        </li>
                    ) ) }
                </ul>
            ) }

            { editingIndex !== null && (
                <EditModal
                    initialText={ prayers[ editingIndex ].text }
                    onSave={ saveEdit }
                    onCancel={ () => setEditingIndex( null ) }
                />
            ) }
        </div>
    );
};

export default PrayerHistory;
