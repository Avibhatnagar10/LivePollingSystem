// pages/TeacherPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../api/pollApi';
import socket from '../socket';

const TeacherPage = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([{ text: '', isCorrect: null }, { text: '', isCorrect: null }]);
    const [timer, setTimer] = useState(60);
    const navigate = useNavigate();
    const updateOption = (index, key, value) => {
        const updated = [...options];
        updated[index][key] = value;
        setOptions(updated);
    };
const handleAskQuestion = async () => {
  try {
    const pollData = {
      question,
      options,
      duration: parseInt(timer) * 1000
    };

    const { poll } = await createPoll(pollData);

    const fullPollPayload = {
      pollId: poll.id,
      question: poll.question,
      options: poll.options,
      duration: poll.duration
    };

    // Set for dev (optional)
    sessionStorage.setItem('currentPoll', JSON.stringify(fullPollPayload));

    // Emit to all students
    socket.emit('poll-started', {
  question: poll.question,
  options: poll.options,
  pollId: poll.id,
  duration: poll.duration,
});

    // Navigate to teacher results page
    navigate('/results', { state: poll });

  } catch (error) {
    alert('Failed to create poll. Try again.');
    console.error(error);
  }
};

    const addOption = () => {
        if (options.length < 6) setOptions([...options, { text: '', isCorrect: null }]);
    };

    return (
        <div style={{ fontFamily: 'Sora, sans-serif', padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
            <button style={{
                backgroundColor: '#6c47ff',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '14px',
                border: 'none',
                fontWeight: 600,
                marginBottom: '2rem'
            }}>✨ Intervue Poll</button>

            <h2 style={{ fontSize: '2rem', fontWeight: 300 }}>
                Let’s <span style={{ fontWeight: 700 }}>Get Started</span>
            </h2>
            <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1rem' }}>
                You’ll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.
            </p>

            {/* Question Input */}
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: 600 }}>Enter your question</label>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <textarea
                        maxLength={100}
                        placeholder="Type your question here..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        style={{
                            width: '100%',
                            height: '80px',
                            fontSize: '1rem',
                            padding: '1rem',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            resize: 'none'
                        }}
                    />
                    <select
                        value={timer}
                        onChange={(e) => setTimer(e.target.value)}
                        style={{ marginLeft: '1rem', padding: '0.5rem', borderRadius: '6px' }}
                    >
                        <option value="30">20 seconds</option>
                        <option value="30">30 seconds</option>
                        <option value="45">45 seconds</option>
                        <option value="60">60 seconds</option>

                    </select>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.9rem', color: '#888' }}>{question.length}/100</div>
            </div>

            {/* Options Section */}
            <div style={{ display: 'flex', marginTop: '1rem', fontWeight: 600 }}>
                <span style={{ flex: 1 }}>Edit Options</span>
                <span style={{ width: '150px', textAlign: 'center' }}>Is it Correct?</span>
            </div>

            {options.map((opt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                        width: '25px',
                        height: '25px',
                        background: '#6c47ff',
                        color: '#fff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        marginRight: '0.8rem'
                    }}>{i + 1}</div>
                    <input
                        type="text"
                        placeholder="Option text"
                        value={opt.text}
                        onChange={(e) => updateOption(i, 'text', e.target.value)}
                        style={{
                            flex: 1,
                            padding: '0.6rem 1rem',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            marginRight: '1rem'
                        }}
                    />
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <label>
                            <input
                                type="radio"
                                checked={opt.isCorrect === true}
                                onChange={() => updateOption(i, 'isCorrect', true)}
                            /> Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                checked={opt.isCorrect === false}
                                onChange={() => updateOption(i, 'isCorrect', false)}
                            /> No
                        </label>
                    </div>
                </div>
            ))}

            <button
                onClick={addOption}
                style={{
                    border: '1px solid #6c47ff',
                    color: '#6c47ff',
                    backgroundColor: '#f9f7ff',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600
                }}
            >
                + Add More option
            </button>

            {/* Ask Question CTA */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button
                    onClick={handleAskQuestion}
                    style={{
                        backgroundColor: '#6c47ff',
                        color: '#fff',
                        padding: '0.9rem 2rem',
                        borderRadius: '40px',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Ask Question
                </button>
            </div>
        </div>
    );
};

export default TeacherPage;
