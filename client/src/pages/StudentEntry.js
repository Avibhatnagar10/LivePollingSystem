import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentEntry = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!name.trim()) return alert('Please enter your name');
    // You can also save to localStorage or context
    navigate('/student/waiting', { state: { name } });
  };

  return (
    <div style={{
      fontFamily: 'Sora, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
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
        marginBottom: '1.5rem',
        cursor: 'pointer'
      }}>
        ✦ Intervue Poll
      </button>

      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginBottom: '0.5rem' }}>
        Let’s <strong style={{ fontWeight: 600 }}>Get Started</strong>
      </h1>

      <p style={{
        fontSize: '0.95rem',
        color: '#555',
        textAlign: 'center',
        maxWidth: '480px',
        marginBottom: '2rem'
      }}>
        If you’re a student, you’ll be able to <strong>submit your answers</strong>,
        participate in live polls, and see how your responses compare with your classmates
      </p>

      <div style={{ width: '100%', maxWidth: '400px', marginBottom: '1.5rem' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
          Enter your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        //   placeholder="Enter your name here..."
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            fontFamily: 'inherit',
          }}
        />
      </div>

      <button
        onClick={handleContinue}
        style={{
          background: 'linear-gradient(to right, #6c47ff, #8b65ff)',
          color: '#fff',
          padding: '0.9rem 2rem',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '30px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default StudentEntry;
