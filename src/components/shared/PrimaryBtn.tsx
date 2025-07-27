type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const PrimaryBtn = ({ children, type = "button" }: Props) => {
  return (
    <button type={type} className="primary-btn">
      {children}
    </button>
  );
};

export default PrimaryBtn;
