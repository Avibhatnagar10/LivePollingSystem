import React, { useEffect, useState } from 'react';
import { deletePoll, getAllPolls } from '../api/pollApi';

const PollHistory = () => {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const data = await getAllPolls();
                setPolls(data);
            } catch (err) {
                console.error('Error fetching poll history:', err);
            }
        };

        fetchPolls();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this poll?')) return;
        try {
            await deletePoll(id);
            setPolls(prev => prev.filter(p => p.id !== id)); // Remove from state
        } catch (err) {
            console.error(err);
            alert('Failed to delete poll.');
        }
    };

    return (
        <div style={{
            fontFamily: 'Sora, sans-serif',
            minHeight: '100vh',
            //   background: '#f9f9fb',
            padding: '3rem',
            maxWidth: '960px',
            margin: '0 auto'
        }}>
            <h1 style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                marginBottom: '2rem',
                color: '#333',
                textAlign: 'center'
            }}>
                👁 Poll History
            </h1>

            {polls.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '1rem', color: '#777' }}>
                    No previous polls found.
                </p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {polls.map((poll) => (
                        <div
                            key={poll.id}
                            style={{
                                background: '#fff',
                                borderRadius: '16px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                padding: '1.5rem',
                                transition: 'transform 0.2s ease',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600, color: '#222' }}>
                                {poll.question}
                            </h3>

                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
                                {poll.options.map((opt, index) => (
                                    <li key={index} style={{
                                        marginBottom: '0.4rem',
                                        color: opt.isCorrect ? '#6c47ff' : '#555',
                                        fontWeight: opt.isCorrect ? 600 : 400
                                    }}>
                                        • {opt.text}
                                    </li>
                                ))}
                            </ul>

                            <div style={{
                                fontSize: '0.85rem',
                                color: '#888',
                                textAlign: 'right',
                                marginBottom: '1rem'
                            }}>
                                {new Date(poll.createdAt).toLocaleString('en-IN', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short'
                                })}
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <button
                                    onClick={() => handleDelete(poll.id)}
                                    style={{
                                        background: '#ff4d4f',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
};

export default PollHistory;
