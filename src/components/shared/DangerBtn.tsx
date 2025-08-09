import React from 'react';

interface DangerBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const DangerBtn: React.FC<DangerBtnProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = ""
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        danger-btn
        ${disabled ? 'disabled' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default DangerBtn; 