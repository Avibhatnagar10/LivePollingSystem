const API_BASE = 'http://localhost:5000/api/polls'; // change this to your hosted backend URL later

export const createPoll = async (pollData) => {
  const res = await fetch(`${API_BASE}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pollData)
  });

  if (!res.ok) throw new Error('Failed to create poll');
  return res.json();
};

export const getAllPolls = async () => {
  const res = await fetch(`${API_BASE}/all`);
  if (!res.ok) throw new Error('Failed to fetch polls');
  return res.json();
};

export const deletePoll = async (pollId) => {
  const res = await fetch(`http://localhost:5000/api/polls/${pollId}`, {
    method: 'DELETE'
  });

  if (!res.ok) throw new Error('Failed to delete poll');
  return res.json();
};