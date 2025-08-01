// src/pages/LandingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleCard from '../components/Rolecard';

const LandingPage = () => {
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleContinue = () => {
        if (role === 'student') navigate('/student');
        else if (role === 'teacher') navigate('/teacher');
    };

    return (
        <div style={{
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
        }}>

            <button style={{
                backgroundColor: '#6c47ff',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '14px',
                border: 'none',
                marginBottom: '1.5rem',
                fontWeight: 600
            }}>
                ✨ Intervue Poll
            </button>
            <h1 style={{ fontSize: '2.7rem', margin: 0, fontWeight: 300, fontFamily: 'Sora, sans-serif' }}>
                Welcome to the <span style={{ fontWeight: 700 }}>Live Polling System</span>
            </h1>

            <p style={{ color: '#555', fontSize: '1.1rem', fontWeight: 400, marginTop: '0.6rem', marginBottom: '2rem', fontFamily: 'Sora, sans-serif' }}>
                Please select the role that best describes you to begin using the live polling system
            </p>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '3rem',
                marginBottom: '2rem',
                fontFamily: 'Sora, sans-serif'
            }}>
                <RoleCard
                    selected={role === 'student'}
                    title="I’m a Student"
                    desc="Participate in polls and view live results in real-time."
                    onClick={() => setRole('student')}
                />
                <RoleCard
                    selected={role === 'teacher'}
                    title="I’m a Teacher"
                    desc="Create polls and see live responses instantly."
                    onClick={() => setRole('teacher')}
                />
            </div>

            <button
                onClick={handleContinue}
                disabled={!role}
                style={{
                    padding: '0.9rem 2.4rem',
                    fontSize: '1.1rem',
                    borderRadius: '40px',
                    border: 'none',
                    color: '#fff',
                    fontWeight: 600,
                    background: role ? '#6c47ff' : '#ccc',
                    cursor: role ? 'pointer' : 'not-allowed',
                    boxShadow: role ? '0 4px 14px rgba(108, 71, 255, 0.3)' : 'none',
                    transition: 'all 0.3s ease-in-out',
                    fontFamily: 'Sora, sans-serif'



                }}
            >
                Continue
            </button>
        </div>
    );
};

export default LandingPage;
