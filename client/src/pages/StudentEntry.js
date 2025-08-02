import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentEntry = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!name.trim()) return alert('Please enter your name');
    sessionStorage.setItem('studentName', name);
    navigate('/student/waiting');
  };

  return (
    <div style={{
      fontFamily: 'Sora, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '2rem',
      backgroundColor: '#fafafa',
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
        marginBottom: '1.5rem',
        cursor: 'default'
      }}>
        ✦ Intervue Poll
      </button>

      <h1 style={{
        fontWeight: 300,
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        marginBottom: '0.5rem',
        lineHeight: 1.3
      }}>
        Let’s <strong style={{ fontWeight: 600 }}>Get Started</strong>
      </h1>

      <p style={{
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        color: '#555',
        maxWidth: '480px',
        marginBottom: '2rem'
      }}>
        If you’re a student, you’ll be able to <strong>submit your answers</strong>,
        participate in live polls, and see how your responses compare with your classmates.
      </p>

      <div style={{
        width: '100%',
        maxWidth: '400px',
        marginBottom: '1.5rem',
        textAlign: 'left'
      }}>
        <label htmlFor="name" style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 500,
          fontSize: '1rem'
        }}>
          Enter your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Avi Bhatnagar"
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <button
        onClick={handleContinue}
        disabled={!name.trim()}
        style={{
          background: name.trim()
            ? 'linear-gradient(to right, #6c47ff, #8b65ff)'
            : '#ccc',
          color: '#fff',
          padding: '0.9rem 2rem',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '30px',
          border: 'none',
          cursor: name.trim() ? 'pointer' : 'not-allowed',
          boxShadow: name.trim() ? '0 4px 12px rgba(108, 71, 255, 0.25)' : 'none',
          transition: 'all 0.2s ease-in-out'
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default StudentEntry;
