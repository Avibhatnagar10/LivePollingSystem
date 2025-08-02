// src/pages/PollResultView.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PollResultView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { question, options, totalVotes = 0 } = location.state || {};

  useEffect(() => {
    if (!question || !options) {
      navigate('/');
    }
  }, [question, options, navigate]);

  if (!question || !options) return null;

  const processedOptions = options.map(opt => {
    const votes = opt.votes || 0;
    const percent = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
    return { ...opt, percent };
  });

  return (
    <div style={{ fontFamily: 'Sora, sans-serif', padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'right' }}>
        <button
          onClick={() => navigate('/history')}
          style={{
            background: '#6c47ff',
            color: '#fff',
            border: 'none',
            borderRadius: '30px',
            padding: '0.6rem 1.2rem',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}
        >
          👁 View Poll History
        </button>
      </div>

      <h3 style={{ fontSize: '1.4rem', margin: '2rem 0 0.5rem 0' }}>Question</h3>
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        <div style={{
          background: 'linear-gradient(to right, #4b4b4b, #2f2f2f)',
          color: '#fff',
          padding: '1rem',
          fontWeight: 600
        }}>
          {question}
        </div>

        <div style={{ padding: '1.5rem' }}>
          <p style={{ textAlign: 'right', fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>
            Total Votes: {totalVotes}
          </p>

          {processedOptions.map((opt, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#6c47ff',
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '0.8rem',
                  fontWeight: 600
                }}>{index + 1}</div>
                <span style={{ fontWeight: 600 }}>{opt.text}</span>
              </div>

              <div style={{
                backgroundColor: '#f0f0f0',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                height: '24px'
              }}>
                <div style={{
                  width: `${opt.percent}%`,
                  backgroundColor: opt.isCorrect === true ? '#6c47ff' : '#d9d9d9',
                  height: '100%',
                  transition: 'width 0.5s',
                  borderRadius: '10px'
                }}></div>

                <span style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontWeight: 600,
                  color: opt.isCorrect === true ? '#6c47ff' : '#555'
                }}>
                  {opt.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={() => navigate('/teacher')}
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
          + Ask a new question
        </button>
      </div>
    </div>
  );
};

export default PollResultView;
