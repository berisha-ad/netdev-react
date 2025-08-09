import React from 'react';

interface SecondaryBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const SecondaryBtn: React.FC<SecondaryBtnProps> = ({
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
        secondary-btn
        ${disabled ? 'disabled' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default SecondaryBtn; 