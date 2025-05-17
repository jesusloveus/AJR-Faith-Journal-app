import React, { useState, useEffect } from "react";
import "./EditModal.css"; 

const EditModal = ( { entry, onSave, onClose } ) =>
{
    const [ text, setText ] = useState( "" );

    useEffect( () =>
    {
        if ( entry )
        {
            setText( entry.text || "" );
        }
    }, [ entry ] );

    const handleSave = () =>
    {
        if ( entry )
        {
            onSave( { ...entry, text } );
            onClose(); 
        }
    };

    if ( !entry ) return null; 

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Edit Entry</h3>
                <textarea
                    value={ text }
                    onChange={ ( e ) => setText( e.target.value ) }
                    rows="6"
                    placeholder="Edit your entry..."
                />
                <div className="modal-buttons">
                    <button className="save-btn" onClick={ handleSave }>
                        Save
                    </button>
                    <button className="cancel-btn" onClick={ onClose }>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
