import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';

const Prayer = () =>
{
    const [ prayers, setPrayers ] = useState( [] );
    const [ newPrayer, setNewPrayer ] = useState( '' );
    const [ editingIndex, setEditingIndex ] = useState( null );

    // Load saved prayers from localStorage
    useEffect( () =>
    {
        const saved = JSON.parse( localStorage.getItem( 'prayerEntries' ) ) || [];
        setPrayers( saved );
    }, [] );

    // Save prayers to localStorage whenever they change
    useEffect( () =>
    {
        localStorage.setItem( 'prayerEntries', JSON.stringify( prayers ) );
    }, [ prayers ] );

    const addPrayer = () =>
    {
        if ( newPrayer.trim() )
        {
            const entry = {
                text: newPrayer,
                date: new Date().toLocaleDateString()
            };
            setPrayers( [ entry, ...prayers ] );
            setNewPrayer( '' );
        }
    };

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
            <h2>Prayer Requests</h2>
            <textarea
                value={ newPrayer }
                onChange={ ( e ) => setNewPrayer( e.target.value ) }
                placeholder="Write your prayer..."
            />
            <button onClick={ addPrayer }>Add Prayer</button>

            <ul>
                { prayers.map( ( prayer, i ) => (
                    <li key={ i } className="entry-card">
                        <strong>{ prayer.date }</strong>
                        <p>{ prayer.text }</p>
                        <button onClick={ () => setEditingIndex( i ) }>Edit</button>
                        <button onClick={ () => deletePrayer( i ) }>Delete</button>
                    </li>
                ) ) }
            </ul>

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

export default Prayer;
