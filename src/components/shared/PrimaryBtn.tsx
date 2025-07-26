type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const PrimaryBtn = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick} className="primary-btn">
      {children}
    </button>
  );
};

export default PrimaryBtn;
