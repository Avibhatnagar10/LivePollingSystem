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
    <div className="landing-container">
      <button className="logo-tag">✨ Intervue Poll</button>

      <h1 className="landing-title">
        Welcome to the <span className="highlight">Live Polling System</span>
      </h1>

      <p className="landing-subtext">
        Please select the role that best describes you to begin using the live polling system
      </p>

      <div className="role-selection">
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
        className={`continue-btn ${!role ? 'disabled' : ''}`}
      >
        Continue
      </button>

      <style>{`
        .landing-container {
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          font-family: 'Sora', sans-serif;
          background-color: #fff;
          text-align: center;
        }

        .logo-tag {
          background-color: #6c47ff;
          color: #fff;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 14px;
          border: none;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .landing-title {
          font-size: 2.7rem;
          margin: 0;
          font-weight: 300;
        }

        .highlight {
          font-weight: 700;
        }

        .landing-subtext {
          color: #555;
          font-size: 1.1rem;
          font-weight: 400;
          margin-top: 0.6rem;
          margin-bottom: 2rem;
        }

        .role-selection {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .continue-btn {
          padding: 0.9rem 2.4rem;
          font-size: 1.1rem;
          border-radius: 40px;
          border: none;
          color: #fff;
          font-weight: 600;
          background: #6c47ff;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(108, 71, 255, 0.3);
          transition: all 0.3s ease-in-out;
        }

        .continue-btn.disabled {
          background: #ccc;
          cursor: not-allowed;
          box-shadow: none;
        }

        @media (max-width: 768px) {
          .landing-title {
            font-size: 2rem;
          }

          .landing-subtext {
            font-size: 1rem;
          }

          .role-selection {
            flex-direction: column;
            gap: 1.5rem;
            width: 100%;
          }

          .continue-btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .landing-title {
            font-size: 1.6rem;
          }

          .logo-tag {
            font-size: 12px;
            padding: 4px 10px;
          }

          .landing-subtext {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
