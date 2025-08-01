// src/pages/StudentPoll.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000');

const StudentPoll = () => {
  const [poll, setPoll] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('poll-started', (data) => {
      setPoll(data);
      setSelectedIndex(null);
      setSubmitted(false);
    });

    socket.on('poll-ended', () => {
      navigate('/student/waiting');
    });

    return () => {
      socket.off('poll-started');
      socket.off('poll-ended');
    };
  }, []);

  const handleSubmit = () => {
    if (selectedIndex === null || submitted || !poll?.id) return;

    socket.emit('submit-answer', {
      pollId: poll.id, // ✅ use poll.id
      optionIndex: selectedIndex,
    });

    setSubmitted(true);
  };

  if (!poll) {
    return (
      <div style={{ fontFamily: 'Sora, sans-serif', textAlign: 'center', paddingTop: '100px' }}>
        <div className="spinner" />
        <h2>Waiting for question...</h2>
        <style>{`
          .spinner {
            margin: 1rem auto;
            width: 36px;
            height: 36px;
            border: 4px solid #eee;
            border-top: 4px solid #6c47ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Sora, sans-serif', maxWidth: '700px', margin: '3rem auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>{poll.question}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {poll.options.map((opt, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            disabled={submitted}
            style={{
              padding: '1rem',
              borderRadius: '12px',
              border: selectedIndex === index ? '2px solid #6c47ff' : '1px solid #ccc',
              background: selectedIndex === index ? '#f1efff' : '#fff',
              textAlign: 'left',
              cursor: submitted ? 'not-allowed' : 'pointer',
              fontWeight: 500,
              transition: '0.2s all ease'
            }}
          >
            {opt.text}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={handleSubmit}
          disabled={selectedIndex === null || submitted}
          style={{
            background: submitted ? '#ccc' : 'linear-gradient(to right, #6c47ff, #8b65ff)',
            color: '#fff',
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '30px',
            border: 'none',
            cursor: submitted ? 'not-allowed' : 'pointer'
          }}
        >
          {submitted ? 'Answer Submitted' : 'Submit Answer'}
        </button>
      </div>
    </div>
  );
};

export default StudentPoll;
    