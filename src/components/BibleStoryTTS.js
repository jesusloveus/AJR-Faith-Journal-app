import React, { useState, useEffect } from 'react';
import './BibleStoryTTS.css'; 

const stories = {
    "Creation": {
        category: "Genesis",
        text: "In the beginning, God created the heavens and the earth."
    },
    "Noah’s Ark": {
        category: "Genesis",
        text: "Noah was a righteous man and walked with God."
    },
    "Moses and the Red Sea": {
        category: "Exodus",
        text: "Moses stretched out his hand, and the sea divided."
    },
    "David and Goliath": {
        category: "1 Samuel",
        text: "David said, 'The battle is the Lord's.' And he struck down Goliath."
    },
    "Daniel in the Lions' Den": {
        category: "Daniel",
        text: "Daniel was thrown into the lions' den, but God shut the mouths of the lions."
    },
    "Jesus Feeds 5000": {
        category: "Gospels",
        text: "Jesus took the five loaves and two fish and fed the multitude."
    },
    "The Crucifixion": {
        category: "Gospels",
        text: "Jesus was crucified, died, and was buried. On the third day, He rose again."
    }
};

const BibleStoryTTS = () =>
{
    const [ selectedStory, setSelectedStory ] = useState( "Creation" );
    const [ voices, setVoices ] = useState( [] );
    const [ selectedVoice, setSelectedVoice ] = useState( null );
    const [ rate, setRate ] = useState( 1 );
    const [ pitch, setPitch ] = useState( 1 );
    const [ isSpeaking, setIsSpeaking ] = useState( false );

    useEffect( () =>
    {
        const synth = window.speechSynthesis;

        const loadVoices = () =>
        {
            const availableVoices = synth.getVoices();
            setVoices( availableVoices );
            setSelectedVoice( availableVoices[ 0 ] );
        };

        if ( synth.onvoiceschanged !== undefined )
        {
            synth.onvoiceschanged = loadVoices;
        }

        loadVoices();
    }, [] );

    const speak = () =>
    {
        const synth = window.speechSynthesis;
        synth.cancel(); // stop any current speech
        const utter = new SpeechSynthesisUtterance( stories[ selectedStory ].text );
        utter.voice = selectedVoice;
        utter.pitch = pitch;
        utter.rate = rate;
        utter.onend = () => setIsSpeaking( false );
        utter.onerror = () => setIsSpeaking( false );
        synth.speak( utter );
        setIsSpeaking( true );
    };

    const stopSpeaking = () =>
    {
        window.speechSynthesis.cancel();
        setIsSpeaking( false );
    };

    return (
        <div className="bible-tts-container">
            <h3 className="bible-tts-title">📖 Daily Bible Story</h3>

            <div className="bible-tts-controls">
                <label>
                    Select a story:
                    <select
                        value={ selectedStory }
                        onChange={ ( e ) => setSelectedStory( e.target.value ) }
                    >
                        { Object.keys( stories ).map( ( key ) => (
                            <option key={ key } value={ key }>
                                { key }
                            </option>
                        ) ) }
                    </select>
                </label>

                <label>
                    Voice:
                    <select
                        onChange={ ( e ) =>
                            setSelectedVoice( voices.find( ( v ) => v.name === e.target.value ) )
                        }
                    >
                        { voices.map( ( voice, index ) => (
                            <option key={ index } value={ voice.name }>
                                { voice.name } ({ voice.lang })
                            </option>
                        ) ) }
                    </select>
                </label>

                <label>
                    Speed:
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={ rate }
                        onChange={ ( e ) => setRate( parseFloat( e.target.value ) ) }
                    />
                </label>

                <label>
                    Pitch:
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={ pitch }
                        onChange={ ( e ) => setPitch( parseFloat( e.target.value ) ) }
                    />
                </label>

                <div className="bible-tts-buttons">
                    <button onClick={ speak }>{ isSpeaking ? "🔁 Replay" : "▶️ Play" }</button>
                    <button onClick={ stopSpeaking }>⏹ Stop</button>
                </div>
            </div>

            <div className="bible-tts-story-card">
                <h4>{ selectedStory }</h4>
                <p><em>({ stories[ selectedStory ].category })</em></p>
                <p>{ stories[ selectedStory ].text }</p>
            </div>
        </div>
    );
};

export default BibleStoryTTS;
