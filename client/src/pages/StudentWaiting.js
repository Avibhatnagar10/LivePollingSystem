// pages/StudentWaiting.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket'; // make sure you have this

const StudentWaiting = () => {
  const navigate = useNavigate();
  const [isPollStarted, setIsPollStarted] = useState(false);

useEffect(() => {
  socket.on('poll-started', (pollData) => {
    navigate('/student/poll', { state: pollData }); // passes poll data
  });

  return () => socket.off('poll-started');
}, []);

useEffect(() => {
  socket.on('poll-started', () => {
    setIsPollStarted(true);
  });

  return () => socket.off('poll-started'); // clean up
}, []);

  return (
    <div style={{
      fontFamily: 'Sora, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f9f9fb',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '1.5rem',
      padding: '2rem'
    }}>
      <button style={{
        background: '#6c47ff',
        color: '#fff',
        border: 'none',
        borderRadius: '30px',
        padding: '0.4rem 1rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        cursor: 'default'
      }}>
        ✦ Intervue Poll
      </button>

      {!isPollStarted && <div className="spinner" />}

      <h2 style={{
        fontWeight: 600,
        fontSize: '1.2rem',
        textAlign: 'center',
        color: '#333',
        marginTop: '0.5rem'
      }}>
        {isPollStarted ? "Redirecting to poll..." : "Wait for the teacher to ask questions..."}
      </h2>

      <style>{`
        .spinner {
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
};

export default StudentWaiting;
