// src/components/Prayer.js
import React, { useState, useEffect } from 'react';
import './Prayer.css';
import EditModal from './EditModal';

const Prayer = () =>
{
    const [ request, setRequest ] = useState( '' );
    const [ requests, setRequests ] = useState( [] );
    const [ editingIndex, setEditingIndex ] = useState( null );
    const [ showEditModal, setShowEditModal ] = useState( false );
    const [ selectedRequest, setSelectedRequest ] = useState( null );

    useEffect( () =>
    {
        const savedRequests = JSON.parse( localStorage.getItem( 'prayerRequests' ) ) || [];
        setRequests( savedRequests );
    }, [] );

    useEffect( () =>
    {
        localStorage.setItem( 'prayerRequests', JSON.stringify( requests ) );
    }, [ requests ] );

    const handleAdd = () =>
    {
        if ( request.trim() )
        {
            const newRequest = { text: request, date: new Date().toLocaleDateString() };
            setRequests( [ newRequest, ...requests ] );
            setRequest( '' );
        }
    };

    const handleDelete = ( index ) =>
    {
        const updatedRequests = [ ...requests ];
        updatedRequests.splice( index, 1 );
        setRequests( updatedRequests );
    };

    const handleEdit = ( index ) =>
    {
        setEditingIndex( index );
        setSelectedRequest( requests[ index ] );
        setShowEditModal( true );
    };

    const handleSaveEdit = ( updatedRequest ) =>
    {
        const updatedRequests = [ ...requests ];
        updatedRequests[ editingIndex ] = updatedRequest;
        setRequests( updatedRequests );
        setShowEditModal( false );
        setEditingIndex( null );
        setSelectedRequest( null );
    };

    return (
        <div className="page">
            <div className="prayer-form">
                <h3>Prayer Request</h3>
                <label htmlFor="request">Enter your prayer:</label>
                <textarea
                    id="request"
                    value={ request }
                    onChange={ ( e ) => setRequest( e.target.value ) }
                />
                <button onClick={ handleAdd }>Add Prayer</button>
            </div>

            { requests.map( ( r, i ) => (
                <div key={ i } className="entry-card">
                    <strong>{ r.date }</strong>
                    <p>{ r.text }</p>
                    <button onClick={ () => handleEdit( i ) }>Edit</button>
                    <button onClick={ () => handleDelete( i ) }>Delete</button>
                </div>
            ) ) }

            { showEditModal && selectedRequest && (
                <EditModal
                    entry={ selectedRequest }
                    onSave={ handleSaveEdit }
                    onClose={ () => setShowEditModal( false ) }
                />
            ) }
        </div>
    );
};

export default Prayer;
