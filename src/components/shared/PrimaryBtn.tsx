type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

const PrimaryBtn = ({ children, type = "button", disabled = false, onClick }: Props) => {
  return (
    <button 
      type={type} 
      className={`primary-btn ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
