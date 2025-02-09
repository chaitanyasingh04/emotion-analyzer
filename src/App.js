import React, { useState } from 'react';
import './App.css';

const EmotionAnalyzer = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [emotions, setEmotions] = useState([]);

  const startListening = async () => {
    setListening(true);
    try {
      const response = await fetch('http://localhost:5000/start', {
        method: 'POST',
      });
      const data = await response.json();
      setTranscript(data.text);
      setEmotions(data.emotions);
    } catch (error) {
      console.error('Error:', error);
    }
    setListening(false);
  };

  const stopListening = () => {
    setListening(false);
    fetch('http://localhost:5000/stop');
  };

  return (
    <div className="container">
      <h1>Real-Time Emotion Analyzer 🎙️</h1>
      <div className="button-group">
        <button
          onClick={startListening}
          disabled={listening}
        >
          {listening ? 'Listening...' : 'Start Listening'}
        </button>
        <button
          onClick={stopListening}
          disabled={!listening}
        >
          Stop Listening
        </button>
      </div>

      {transcript && (
        <div className="transcript">
          <h2>You Said:</h2>
          <p>"{transcript}"</p>
        </div>
      )}

      {emotions.length > 0 && (
        <div className="emotions">
          <h2>Detected Emotions:</h2>
          <ul>
            {emotions.map((emotion, index) => (
              <li key={index}>
                {emotion.label}: {Math.round(emotion.score * 100)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmotionAnalyzer;
