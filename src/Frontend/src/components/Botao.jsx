// src/components/Botao.jsx
import React from 'react';

export default function Botao({ children, onClick, type = 'button', disabled, variant = 'primary', style }) {
  
  // Define as cores com base na propriedade 'variant'
  const variants = {
    primary: { backgroundColor: '#007bff', color: '#fff' },
    success: { backgroundColor: '#28a745', color: '#fff' },
    danger: { backgroundColor: '#dc3545', color: '#fff' },
    outline: { backgroundColor: 'transparent', color: '#007bff', border: '1px solid #007bff' }
  };

  const baseStyle = {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 'bold',
    opacity: disabled ? 0.7 : 1,
    transition: 'opacity 0.2s',
    ...variants[variant],
    ...style
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled} 
      style={baseStyle}
    >
      {children}
    </button>
  );
}