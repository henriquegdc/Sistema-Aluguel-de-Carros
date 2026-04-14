// src/components/Input.jsx
import React from 'react';

export default function Input({ label, name, type = 'text', value, onChange, placeholder, required, maxLength, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%', ...style }}>
      {label && <label style={{ fontWeight: '500', color: '#333', fontSize: '14px' }}>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        style={{
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '16px',
          boxSizing: 'border-box',
          width: '100%',
          outline: 'none',
          transition: 'border-color 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = '#007bff'}
        onBlur={(e) => e.target.style.borderColor = '#ccc'}
      />
    </div>
  );
}