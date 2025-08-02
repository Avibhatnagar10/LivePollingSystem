import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

const StudentPoll = () => {
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('currentPoll');

    if (!stored) {
      console.warn('❌ No poll in sessionStorage. Redirecting...');
      navigate('/student/waiting');
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (parsed?.pollId && parsed?.question) {
        setPoll(parsed);
      } else {
        throw new Error('⚠️ Invalid poll data');
      }
    } catch (err) {
      console.error('🚨 Poll parse error:', err);
      sessionStorage.removeItem('currentPoll');
      navigate('/student/waiting');
    }

    // ✅ Listen for poll end
    const handlePollEnd = () => {
      console.log('📴 Poll ended by teacher');
      sessionStorage.removeItem('currentPoll');
      navigate('/student/waiting');
    };

    socket.on('poll-ended', handlePollEnd);

    return () => {
      socket.off('poll-ended', handlePollEnd);
    };
  }, [navigate]);

  const handleSubmit = () => {
    if (selectedIndex === null || submitted || !poll?.pollId) return;

    socket.emit('submit-answer', {
      pollId: poll.pollId,
      optionIndex: selectedIndex
    });

    setSubmitted(true);
  };

  if (!poll) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '100px', fontFamily: 'Sora, sans-serif' }}>
        <div className="spinner" />
        <h2>Loading poll...</h2>
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
    <div style={{ fontFamily: 'Sora, sans-serif', maxWidth: '700px', margin: '3rem auto' }}>
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
