const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api/polls`;

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
  const res = await fetch(`${API_BASE}/${pollId}`, {
    method: 'DELETE'
  });

  if (!res.ok) throw new Error('Failed to delete poll');
  return res.json();
};
