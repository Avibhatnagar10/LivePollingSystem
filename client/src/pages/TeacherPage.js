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

            sessionStorage.setItem('currentPoll', JSON.stringify(fullPollPayload));

            socket.emit('poll-started', fullPollPayload);

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
        <div className="teacher-page">
            <button className="tag-btn">✨ Intervue Poll</button>

            <h2 className="page-title">
                Let’s <span className="highlight">Get Started</span>
            </h2>
            <p className="subtext">
                You’ll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.
            </p>

            {/* Question Input */}
            <div className="question-block">
                <label className="label">Enter your question</label>
                <div className="question-input-group">
                    <textarea
                        maxLength={100}
                        placeholder="Type your question here..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="question-input"
                    />
                    <select
                        value={timer}
                        onChange={(e) => setTimer(e.target.value)}
                        className="timer-select"
                    >
                        <option value="20">20 seconds</option>
                        <option value="30">30 seconds</option>
                        <option value="45">45 seconds</option>
                        <option value="60">60 seconds</option>
                    </select>

                </div>
                <div className="char-count">{question.length}/100</div>
            </div>

            {/* Options Section */}
            <div className="option-labels">
                <span>Edit Options</span>
                <span>Is it Correct?</span>
            </div>

            {options.map((opt, i) => (
                <div className="option-row" key={i}>
                    <div className="option-index">{i + 1}</div>
                    <input
                        type="text"
                        placeholder="Option text"
                        value={opt.text}
                        onChange={(e) => updateOption(i, 'text', e.target.value)}
                        className="option-input"
                    />
                    <div className="correct-toggle">
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

            <button onClick={addOption} className="add-option-btn">+ Add More option</button>

            <div className="ask-btn-wrapper">
                <button onClick={handleAskQuestion} className="ask-btn">
                    Ask Question
                </button>
            </div>

            <style>{`
        .teacher-page {
          font-family: 'Sora', sans-serif;
          padding: 3rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .tag-btn {
          background-color: #6c47ff;
          color: #fff;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 14px;
          border: none;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 300;
          margin-bottom: 0.5rem;
        }

        .highlight {
          font-weight: 700;
        }

        .subtext {
          color: #666;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .question-block {
          margin-bottom: 1rem;
        }

        .label {
          font-weight: 600;
        }

        .question-input-group {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .question-input {
          flex: 1;
          height: 80px;
          font-size: 1rem;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          resize: none;
        }

        .timer-select {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 1rem;
  border: 1px solid #ccc;
  width: 160px;           /* Set reasonable width */
  height: 42px;           /* Match height with textareas/buttons */
  appearance: none;       /* Remove native arrow for styling */
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='5'%3E%3Cpath%20fill='black'%20d='M0%200l5%205l5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 10px 5px;
  cursor: pointer;
}


        .char-count {
          text-align: right;
          font-size: 0.9rem;
          color: #888;
        }

        .option-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          font-weight: 600;
        }

        .option-row {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .option-index {
          width: 25px;
          height: 25px;
          background: #6c47ff;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .option-input {
          flex: 1;
          min-width: 200px;
          padding: 0.6rem 1rem;
          border: 1px solid #ddd;
          border-radius: 6px;
        }

        .correct-toggle {
          display: flex;
          gap: 1rem;
        }

        .add-option-btn {
          border: 1px solid #6c47ff;
          color: #6c47ff;
          background-color: #f9f7ff;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .ask-btn-wrapper {
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .ask-btn {
          background-color: #6c47ff;
          color: #fff;
          padding: 0.9rem 2rem;
          border-radius: 40px;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .question-input-group {
            flex-direction: column;
          }

          .option-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .correct-toggle {
            width: 100%;
            justify-content: flex-start;
          }

          .ask-btn-wrapper {
            justify-content: center;
          }

          .teacher-page {
            padding: 1.5rem;
          }
        }
      `}</style>
        </div>
    );
};

export default TeacherPage;
