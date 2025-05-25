import React, { useState } from 'react';
import './EditModal.css';

const EditModal = ( { initialText, onSave, onCancel } ) =>
{
    const [ text, setText ] = useState( initialText );

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <textarea
                    value={ text }
                    onChange={ ( e ) => setText( e.target.value ) }
                    rows={ 6 }
                />
                <button onClick={ () => onSave( text ) }>Save</button>
                <button onClick={ onCancel }>Cancel</button>
            </div>
        </div>
    );
};

export default EditModal;
