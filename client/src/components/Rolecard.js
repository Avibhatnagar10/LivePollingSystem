// src/components/Rolecard.js
import React from 'react';

const RoleCard = ({ selected, title, desc, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        padding: '1rem 1.5rem',
        border: `3px solid ${selected ? '#6c47ff' : '#ddd'}`,
        borderRadius: '10px',
        width: '230px',
        textAlign: 'left'
      }}
    >
<h3 style={{ fontWeight: 600, fontSize: '1.3rem', marginBottom: '0.5rem' }}>{title}</h3>
<p style={{ fontSize: '1rem', color: '#555', fontWeight: 400 }}>{desc}</p>
    </div>
  );
};

export default RoleCard;
