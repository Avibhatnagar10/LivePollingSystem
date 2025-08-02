// pages/StudentWaiting.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

const StudentWaiting = () => {
  const navigate = useNavigate();
  const [isPollStarted, setIsPollStarted] = useState(false);

  useEffect(() => {
    // Join waiting room
    socket.emit('join-waiting-room');

    // Handle poll start from teacher
    const handlePollStarted = (pollData) => {
      if (pollData?.pollId) {
        sessionStorage.setItem('currentPoll', JSON.stringify(pollData));
        setIsPollStarted(true);
        navigate('/student/poll');
      }
    };

    socket.on('poll-started', handlePollStarted);

    return () => {
      socket.off('poll-started', handlePollStarted);
    };
  }, [navigate]);

  return (
     <div style={{
       fontFamily: 'Sora, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    }}>
      <button style={{
        background: '#6c47ff',
        color: '#fff',
        border: 'none',
        borderRadius: '30px',
        padding: '0.4rem 1rem',
        fontSize: '0.75rem',
        fontWeight: 600,
        cursor: 'default',
        marginBottom: '1.5rem'
      }}>
        ✦ Intervue Poll
      </button>
      <div className="spinner" />
     <h2 style={{ marginTop: '1rem', fontWeight: 500, fontFamily: 'Sora, sans-serif', }}>
  Hey {sessionStorage.getItem('studentName') || 'Student'}, wait for the teacher to ask a question...
</h2>

      <style>{`
        .spinner {
          width: 36px;
          height: 36px;
          border: 4px solid #eee;
          border-top: 4px solid #6c47ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default StudentWaiting;
